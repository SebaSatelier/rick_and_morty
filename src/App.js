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

const EMAIL = 'a@a.com'
const PASSWORD = 'asdasd1'


function App() {
   const [characters,setCharacters] = useState([])
   
   const [access,setAccess] = useState(false)
   
   const navigate = useNavigate();
   
   const location = useLocation();
   
   function login(userData) {
      if (userData.password === PASSWORD && userData.email === EMAIL) {
         setAccess(true);
         navigate('/home');
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
   
   function onSearch(id) {
      if(!id) return window.alert('¡Debes ingresar un ID válido!');
      if(!repeat(characters,id)){
         axios(`https://rickandmortyapi.com/api/character/${id}`)
         .then(({ data }) => {
               setCharacters((oldCharacter) => [...oldCharacter,data] );
               
            }).catch(() => window.alert('¡No hay personajes con este ID!'))
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
