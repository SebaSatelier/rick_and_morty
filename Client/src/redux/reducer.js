import { ADD_FAV, REMOVE_FAV, FILTER, ORDER,RECUPERAR_FAVORITOS, ADD_CHARACTER, REMOVE_CHARACTER } from "./action-type";


const initialState = {
    characters : [],
    myFavorites: [],
    allFavCharacters: []
}

const reducer = (state = initialState, action)=>{
    switch(action.type){
        case ADD_CHARACTER:
            return{
                ...state,
                characters: action.payload
            };
        case RECUPERAR_FAVORITOS:
            return{
                ...state,
                myFavorites: action.payload,
                allFavCharacters: action.payload
            };
        case ADD_FAV:
            return {
                ...state,
                myFavorites: action.payload,
                allFavCharacters: action.payload
            };
        case REMOVE_FAV:
            return {
                ...state,
                myFavorites: action.payload,
                allFavCharacters: action.payload
            }
        case FILTER:
            const allCharactersFavCopy = [...state.allFavCharacters]
            if(action.payload === "all"){
                return{
                    ...state,
                    myFavorites: state.allFavCharacters
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