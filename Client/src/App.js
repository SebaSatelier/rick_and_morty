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

const URL = 'http://localhost:3001/rickandmorty';

function App() {
   const [characters,setCharacters] = useState([])
   
   const [access,setAccess] = useState(false)
   
   const navigate = useNavigate();
   
   const location = useLocation();
   
   const login = async (userData) => {
      try{
      const {email,password} = userData;
         const {data} = await axios(`${URL}/login?email=${email}&password=${password}`);
         const access = data.access
         setAccess(access);
         access && navigate('/home')
      }catch(error){
         return error.message
      }
   }

   const repeat = (characters,id) => {
      let repeat = false;
      characters.forEach(character=> {if(character.id === Number(id)) repeat = true;})
      return repeat;
   } 

   const logOut = () => {
      setAccess(false)
  }
   
   useEffect(() => {
      !access && navigate('/')
   }, [access,navigate]);


   useEffect(() => {
      if(location.pathname === "/"){
      document.body.classList.add('body-bg');}
      return () => {
        document.body.classList.remove('body-bg');
      };
    }, [location]);
   
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
