import { Product } from "../../types";
import { useLocation, useNavigate } from "react-router-dom";

export default function StockCard(product: Product) {
   const navigate = useNavigate();
   const location = useLocation();
   return (
      <>
         <div className="grid grid-cols-4 w-full p-4 border-b-1 border-gray-200">
            <p className="text-lg  text-center">
               {product.type} x {product.weight}{" "}
               {product.haveWeight ? "Kg." : "mL."}
            </p>
            <p className="text-lg text-center">{product.stock}</p>
            <p className="text-lg text-center">
               {product.stock > 0 ? "Disponible" : "Agotado"}
            </p>
            <button
               className=" text-white mx-auto bg-blue-500 p-2 rounded-md w-1/2 cursor-pointer hover:scale-105 duration-200"
               onClick={() => {
                  navigate(location.pathname + `?productId=${product._id}`);
               }}
            >
               Stock Individual
            </button>
         </div>
      </>
   );
}
