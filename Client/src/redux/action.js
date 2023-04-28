import {ADD_FAV, REMOVE_FAV, FILTER, ORDER, RECUPERAR_FAVORITOS,REMOVE_CHARACTER, ADD_CHARACTER} from './action-type'
import axios from 'axios'

//URL del endpoint para las peticiones

const ENDPOINT = 'http://localhost:3001/rickandmorty';

//Action para traer un personaje de la api

export const addCharacter = (id) => {
   return async (dispatch) => {
      try{
         const {data} = await axios(`${ENDPOINT}/character/${id}`)
         return dispatch({
            type: ADD_CHARACTER,
            payload : data
         })
      }catch(error){
         return error.message
      }
   }
}


//Action para traer los favoritos guardados en el servidor,(PERSISTENCIA DE DATOS)
export const recFav = () => {
   return async (dispatch)=> {
      try{
         const {data} = await axios(`${ENDPOINT}/fav`);
         return dispatch({
            type: RECUPERAR_FAVORITOS,
            payload : data
         })
      }catch(error) {
         return error.message
      }
   }
}


//Action para agregar un personaje a favoritos.
export const addFav = (character) => {
   return async (dispatch) => {
      try{
      const {data} = await axios.post(`${ENDPOINT}/fav`, character)
      return dispatch({
            type: ADD_FAV,
            payload: data,
         });
      }catch(error){ 
         return error.message
      }
   };
};

// Action para borrar un personaje de favoritos
export const removeFav = (id) => {
   return async (dispatch) => {
      try{
         const {data} = await axios.delete(`${ENDPOINT}/fav/${id}`);
         return dispatch({
               type: REMOVE_FAV,
               payload: data,
            });
         
      }catch(error) {
         return error.message;
      }
   };
};

//Action para el filtrado de personajes en favoritos por genero
export const filterCards = (gender) => {
    return{type:FILTER, payload: gender}
}


//Funcion para el ordenamiento de favoritos, se puede elegir ascendente o descendente.
export const orderCards = (order) => {
    return{type:ORDER, payload: order }
}