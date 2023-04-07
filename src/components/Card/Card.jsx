import { Link } from "react-router-dom";
import styleCard from './Card.module.css'

export default function Card(props) {
   
   return (
      <div className={styleCard.Card}>
         <img src={props.image} alt={props.name} className={styleCard.images}/>
         <h2 className={styleCard.nameQuestion}>Name?</h2>

         <div className={styleCard.nameDiv}>
         <h2 className={styleCard.name}><Link to={`/detail/${props.id}`}>{props.name}</Link></h2>
         </div>
         
         <div className={styleCard.buttonDiv}>
         <button onClick={()=>props.onClose(props.id)} className={styleCard.buttonClose}>X</button>
         </div>
      </div>
   );
}
