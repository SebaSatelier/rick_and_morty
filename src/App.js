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

const EMAIL = 'a@a'
const PASSWORD = 'a'


function App() {
   const [characters,setCharacters] = useState([])
   
   const [access,setAccess] = useState(false)
   const navigate = useNavigate();
   
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
      navigate('/')
  }
   
   useEffect(() => {
      !access && navigate('/');
   }, [access]);

   const location = useLocation()
   
   function onSearch(id) {
      if(!repeat(characters,id)){
         axios(`https://rickandmortyapi.com/api/character/${id}`)
         .then(({ data }) => {
               setCharacters((oldCharacter) => [...oldCharacter,data] );
               
            }).catch(() => window.alert('¡No hay personajes con este ID!'))
      }
      else {
        window.alert('¡Ese personaje ya se encuentra renderizado')
      }

}

   const onClose = (id) => {
      const arrayPersonajes = characters.filter(character => character.id !== Number(id))
      setCharacters(arrayPersonajes)
   }

   return (
      <div className='App'>
         {(location.pathname !== '/') ? <NavBar onSearch = {onSearch} logOut={logOut}/> : null}
         <Routes>
            <Route path='/' element={<Form login={login}/>}/>
            <Route path='/home' element={<Cards characters={characters} onClose={onClose}/>}/>
            <Route path='/about' element={<About/>}/> 
            <Route path='/detail/:id' element={<Detail/>}/>
            <Route path=':error' element={<Error/>}/>
         </Routes>
      </div>
   );
}

export default App;
