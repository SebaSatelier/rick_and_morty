    import axios from 'axios'
    import { useParams} from 'react-router-dom';
    import { useState,useEffect } from 'react';
    import style from './Detail.module.css'



    const Detail = () => {
        const {id} = useParams();

        const [character,setCharacter] = useState({})
        
        useEffect(() => {
            axios(`http://localhost:3001/rickandmorty/character/${id}`)
            .then(({ data }) => {
            if (data.name) {
                setCharacter(data);
            } else {
                window.alert('No hay personajes con ese ID');
            }
            });
            return setCharacter({});
        }, [id]);

        return (
            <div>
                <div className={style.container} >
                    <h1>{character.name}</h1>

                    <h2>STATUS: {character.status}</h2>
                    <h2>{character.species}</h2>
                    <h2>{character.gender}</h2>
                    <h2>{character.origin?.name}</h2>
                    <img className={style.img} src={character.image} alt={character.name}/>
                </div>
            </div>
        )
    }

    export default Detail;