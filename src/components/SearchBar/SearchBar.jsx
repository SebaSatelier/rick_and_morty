import { useState } from "react";
import styleSearchBar from './SearchBar.module.css'

export default function SearchBar({onSearch,location}) {
   let [id,setId] = useState("")

   const handleChange = (event) =>{
      setId(event.target.value)
   }

   
   return (
      <div className={styleSearchBar.container}>
         <input className={styleSearchBar.input} type='search' onChange = {handleChange} value={id} placeholder="ID del personaje"/>
         <button className={styleSearchBar.buttons} onClick={() => onSearch(id)} disabled={(location.pathname !== '/about' && location.pathname !== '/favorites') ? false:true}>Agregar</button>
      </div>
   );
}
