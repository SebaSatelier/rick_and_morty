import { NavLink, Outlet,useParams} from "react-router-dom";
import style from './Card.module.css'
import {addFav, removeFav} from '../../redux/action'
import { connect } from 'react-redux';
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AiFillHeart, AiOutlineHeart,AiOutlineCloseSquare } from 'react-icons/ai';





const Card = ({gender,name, id, image, onClose, addFav,removeFav, myFavorites}) => {
   const location = useLocation()

   const detail = useParams()
   console.log(detail)
   
   const [isFav,setIsFav] = useState(false)
   
   const handleFavorite =()=>{
      if(isFav){
         setIsFav(false)
         removeFav(id)
         
      }
      if(!isFav){
         setIsFav(true)
         addFav({name,image,id,gender})
      }
      console.log(myFavorites);
   }
   
   useEffect(() => {
      myFavorites?.forEach(fav => {
         if (fav.id === id) {
            setIsFav(true);
         }
      });
   }, [myFavorites]);
   
   return (
      <div>

      <div className={style.container}>
         {
            isFav ? (
               <button className={style.favButton}  onClick={handleFavorite}><AiFillHeart className={style.heartFill}/></button>
               ) : (
                  <button className={style.favButton} onClick={handleFavorite}><AiOutlineHeart className={style.heart}/></button>
                  )
               }
         <img src={image} alt={name} className={style.images}/>
         <h2 className={style.nameQuestion}>Name?</h2>

         <h2 className={style.name}><NavLink to={`detail/${id}`} className={style.navLink}>{name}</NavLink></h2>
         
         {(location.pathname !== "/favorites")  && <button onClick={()=>onClose(id)} className={style.favButton} ><AiOutlineCloseSquare className={style.buttonClose} /></button>}
               
               </div>
         {(id === Number(detail.id)) && <Outlet className={style.detail}/>}      
      </div>
   );
}

const mapDispatchToProps = (dispatch)=>{
   return {
      addFav: (character)=>dispatch(addFav(character)),
      removeFav: (id) => dispatch(removeFav(id))
   }
}

const mapStateToProps = (state) => {
   return {
      myFavorites: state.myFavorites
   }
}

export default connect(
   mapStateToProps,//me permite acceder al estado global
   mapDispatchToProps//me permite despachar actions
   )(Card)
   