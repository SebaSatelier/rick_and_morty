import Card from '../Card/Card';
import { useState } from 'react';
import { connect,useDispatch } from 'react-redux';
import style from './Favorites.module.css'
import { filterCards, orderCards } from '../../redux/action';


const Favorites = ({myFavorites}) => {
    const dispatch = useDispatch()

    const [aux, setAux] = useState(false)


    const handleOrder = (event) =>{
        dispatch(orderCards(event.target.value))
        setAux(true)
    }

    const handlerFilter = (event) => {
        dispatch(filterCards(event.target.value))
    }


    return (
        <div>
            <div>
                <select onChange={handleOrder}>
                    <option value="A">A</option>
                    <option value="D">D</option>
                </select>
                <select onChange={handlerFilter}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Genderless">Genderless</option>
                    <option value="unknown">unknown</option>
                    <option value="all">All Characters</option>
                </select>
            </div>
            <div className={style.Favorites}>
                {
                    myFavorites?.map(fav => {
                        return (
                            <Card
                            key={fav.id}
                            id={fav.id}
                            name= {fav.name}
                            image= {fav.image}
                            />
                            )
                            
                        })
                    }
            </div>
    </div>
    );
}

const mapStateToProps = (state) => {
    return {
        myFavorites: state.myFavorites
    }
}

export default connect(
    mapStateToProps,
    null
)(Favorites)