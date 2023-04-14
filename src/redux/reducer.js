import { ADD_FAV, REMOVE_FAV, FILTER, ORDER } from "./action-type";


const initialState = {
    myFavorites: [],
    allCharacters: []
}

const reducer = (state = initialState, action)=>{
    switch(action.type){
        case ADD_FAV:
            return {
                ...state,
                myFavorites: [...state.allCharacters, action.payload],
                allCharacters: [...state.allCharacters, action.payload],
            };
        case REMOVE_FAV:
            return {
                ...state,
                myFavorites: state.myFavorites.filter(elemento => {return elemento.id !== action.payload}),
                allCharacters: state.allCharacters.filter(elemento => {return elemento.id !== action.payload})
            }
        case FILTER:
            const allCharactersFavCopy = [...state.allCharacters]
            if(action.payload === "all"){
                return{
                    ...state,
                    myFavorites: state.allCharacters
                }
            }
            return{
                ...state,
                myFavorites: allCharactersFavCopy.filter(elemento => {return elemento.gender === action.payload})
            }
            
        case ORDER:
            const allCharactersFav = [...state.myFavorites]
            return{
                ...state,
                myFavorites: allCharactersFav.sort((a,b) => {return (action.payload === 'A')?  a.id-b.id : b.id-a.id })
            } 
        default:
            return {...state}    
    }
}



export default reducer;