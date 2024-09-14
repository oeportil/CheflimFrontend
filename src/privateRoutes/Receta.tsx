import { FaArrowLeft } from "react-icons/fa";
import { MouseEventHandler, useEffect, useState } from "react";

//For ratings
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

import { useNavigate } from "react-router-dom";

const Receta = () => {
    const navigate = useNavigate();
    const [rating, setRating] = useState<number>(0);

    useEffect(() => {
        //for set rating
        console.log(rating)
    }, [rating])
    
  return (
    <main className="container">
      <div className="text-start mt-2" style={{cursor: "pointer"}} onClick={() => navigate(-1)}>
            <FaArrowLeft size={30}/>
      </div>
      <div className="bg-green text-white my-2 py-2 px-4 rounded-3 d-flex flex-column align-items-center">
       
        <div className="mx-auto text-center">
          <h3>Pan con Colgate</h3>
          <h5>de Bryan Avila</h5>
        </div>
        <img className="rounded-3" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYspTJaFUunDEVfS-QOd69kd__u9o3OR3T2A&s" alt="Pan con colgate" style={{width: "90%", maxWidth: "300px"}}/>       
        <Rating style={{maxWidth: 180}} value={rating} onChange={setRating}/>
      </div>  
      <div>
        <h3 className="text-center">5 Porciones</h3>
        <div>
            <div className="d-flex justify-content-center">
                <button className="bg-red bg-red-hover p-2 text-white rounded-5 " style={{maxWidth: "20rem", width: "95%"}}>
                    Agregar a la Lista
                </button>     
            </div>           
            <h4>Ingredientes: </h4>
            <ul>
                <li>1</li>
                <li>2</li>
            </ul>
        </div>
        <div>
            <h4>Instrucciones: </h4>
            <ol>
                <li>numero uno</li>
                <li>numero dos</li>
            </ol>
        </div>
      </div>
    </main>
  )
}

export default Receta