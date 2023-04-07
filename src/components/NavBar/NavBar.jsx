import { Link } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar'
import styleNavBar from './NavBar.module.css'

const NavBar = ({onSearch, logOut})=>{

    const aleatorio = ()=>{
        let id = Math.floor(Math.random() * (826 - 1) + 1)
        onSearch(id)
    }

    return(
        <nav className={styleNavBar.NavBar}>
            <div className={styleNavBar.buttonDiv}>
                <button>
                    <Link to='/about'>About</Link>
                </button>
                <button>
                    <Link to="/home">Home</Link>
                </button>
                <button onClick={aleatorio}>
                    Agregar Personaje
                </button>
            </div>

            <SearchBar onSearch={onSearch}/>
            <button onClick={logOut}>
                Cerrar sesion
            </button>
        </nav>
    )
}

export default NavBar