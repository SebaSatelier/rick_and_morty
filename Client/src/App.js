import { useState, useEffect } from 'react';
import './App.css';
import Cards from './components/Cards/Cards.jsx';
import NavBar from './components/NavBar/NavBar';
import axios from 'axios';
import {Routes,Route,useLocation, useNavigate} from 'react-router-dom'
import About from './components/About/About'
import Detail from './components/Detail/Detail';
import Error from './components/Error/Error';
import Form from './components/Form/Form';
import Favorites from './components/Favorites/Favorites'
import { useDispatch } from 'react-redux';
import { recFav,addCharacter } from '../src/redux/action';

const URL = 'http://localhost:3001/rickandmorty';

function App() {
   //Estado local para el renderizado de cards
   const [characters,setCharacters] = useState([])

   const dispatch = useDispatch()
   
   //Estado local para el acceso
   const [access,setAccess] = useState(false)
   
   //Para la navegacion a distintas rutas, sobre todo cuando se hace login
   const navigate = useNavigate();
   
   //Para poder saber en que ruta estamos y decidir el manejo de rutas
   const location = useLocation();
   
   //Funcion asincronica para el login del usuario
   const login = async (userData) => {
      try{
      const {email,password} = userData;
         const {data} = await axios(`${URL}/login?email=${email}&password=${password}`);
         const access = data.access
         setAccess(access);
         access && navigate('/home')
         recuperarFavoritos()
      }catch(error){
         return error.message
      }
   }

   // Funcion para chequear cartas previamente renderizadas y no repetir
   const repeat = (characters,id) => {
      let characterRepeat = false
      characters.forEach(character=> {if(character.id === Number(id)) characterRepeat = true;})
      return characterRepeat;
   } 
   
   const recuperarFavoritos = ()=> {
     dispatch(recFav())
   }
   //Funcion para el logout del usuario
   const logOut = () => {
      setAccess(false)
  }
   //Use effect que se queda atento al acceso y elegir la ruta de navegacion
   useEffect(() => {
      !access && navigate('/')
   }, [access,navigate]);

//UseEffect para renderizar en el login un background distinto del resto de la app.Se queda atento a la locacion

   useEffect(() => {
      if(location.pathname === "/"){
      document.body.classList.add('body-bg');}
      return () => {
        document.body.classList.remove('body-bg');
      };
    }, [location]);

   // Funcion asincronica que manda una peticion a al server para pedir informacion de una card.
   //Utiliza la funcion repeat para saber si la card solicitado ya esta renderizada en home
   const onSearch = async (id) => {
      if(!id) return window.alert('¡Debes ingresar un ID válido!');
      if(!repeat(characters,id)){
         try{
            const {data} = await axios(`${URL}/character/${id}`);
               setCharacters((oldCharacter) => [...oldCharacter,data] );
               
         }catch(error){
            return window.alert('¡No hay personajes con este ID!')
         }   
      }
      else {
        window.alert('¡Ese personaje ya se encuentra renderizado!')
      }

}
   //Funcion para cerrar las cartar renderizadas en el home.
   const onClose = (id) => {
      const arrayPersonajes = characters.filter(character => character.id !== Number(id))
      setCharacters(arrayPersonajes)
   }

   return (
      <div className='App'>
         {(location.pathname !== '/') ? <NavBar onSearch = {onSearch} logOut={logOut} location={location}/> : null}
         <Routes>
            <Route path='/' element={<Form login={login}/>}/>
            <Route path='/home' element={<Cards characters={characters} onClose={onClose} location={location}/>}>
               <Route path=':detail/:id' element={<Detail/>}/> 
            </Route>
            <Route path='/about' element={<About/>}/> 
            <Route path='/favorites' element={<Favorites/>}/>
            <Route path=':error' element={<Error/>}/>
         </Routes>
      </div>
   );
}

export default App;
