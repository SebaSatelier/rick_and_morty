import { Link } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar'
import styleNavBar from './NavBar.module.css'


const NavBar = ({onSearch, logOut, location})=>{

    const aleatorio = ()=>{
        let id = Math.floor(Math.random() * (826 - 1) + 1)
        onSearch(id)
    }


    return(
        <nav className={styleNavBar.NavBar}>
            <div className={styleNavBar.buttonsDiv}>
                
                <Link to='/about'><button className={styleNavBar.buttons}>About </button></Link>

                <Link to="/home"><button className={styleNavBar.buttons}> Home</button></Link>

                <Link to="/favorites"><button className={styleNavBar.buttons}> Favorites</button></Link>
                
                <button className={styleNavBar.buttons} onClick={aleatorio} disabled={(location.pathname !== '/about' && location.pathname !== '/favorites') ? false:true} >
                    Agregar Personaje
                </button>
            </div>  

            <SearchBar onSearch={onSearch} location={location}/>

            <button className={styleNavBar.buttons} onClick={logOut} >
                Cerrar sesion
            </button>
        </nav>
    )
}

export default NavBar