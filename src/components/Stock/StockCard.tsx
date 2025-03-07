import { Product } from "../../types";
import { useLocation, useNavigate } from "react-router-dom";

export default function StockCard(product: Product) {
   const navigate = useNavigate();
   const location = useLocation();

   const { _id, type, weight, stock, haveWeight } = product;
   return (
      <>
         <div className="grid grid-cols-4 w-full p-4 border-b-1 border-gray-200">
            <p className="text-lg  text-center">
               {type} x {weight} {haveWeight ? "Kg." : "mL."}
            </p>
            <p className="text-lg text-center">{stock}</p>
            {stock === 0 ? (
               <p className="text-lg text-center bg-red-200 p-2 w-1/3 mx-auto text-red-700 rounded-md">
                  Agotado
               </p>
            ) : stock < 10 ? (
               <p className="text-lg text-center bg-yellow-200 p-2 w-1/3 mx-auto text-yellow-700 rounded-md">
                  Poco Stock
               </p>
            ) : (
               <p className="text-lg text-center  bg-green-200 p-2 w-1/3 mx-auto text-green-700 rounded-md">
                  Disponible
               </p>
            )}

            <button
               className=" text-white text-lg mx-auto bg-orange-500/80 p-2 rounded-md w-1/2 cursor-pointer hover:scale-105 duration-200"
               onClick={() => {
                  navigate(location.pathname + `?productId=${_id}`);
               }}
            >
               Stock Individual
            </button>
         </div>
      </>
   );
}
