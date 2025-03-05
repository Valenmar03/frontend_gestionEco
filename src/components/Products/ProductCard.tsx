import { useLocation, useNavigate } from "react-router-dom";
import { Product } from "../../types";

export default function ProductCard(product: Product) {
   const navigate = useNavigate();
   const location = useLocation();
   return (
      <div className="grid grid-cols-4 w-full p-4 border-b-1 border-gray-200">
         <p className="text-lg  text-center">
            {product.type} x {product.weight}{" "}
            {product.haveWeight ? "Kg." : "mL."}
         </p>
         <p className="text-lg  text-center">
            {product.weight} {product.haveWeight ? "Kg." : "mL."}
         </p>
         <p className="text-lg  text-center">{product.price.retailPrice}</p>
         <div className="w-full flex justify-center gap-5">
            <button
               className=" text-white bg-blue-500 p-2 rounded-md w-1/2 cursor-pointer hover:scale-105 duration-200"
               onClick={() => {
                  navigate(location.pathname + `?productId=${product._id}`);
               }}
            >
               Editar
            </button>
         </div>
      </div>
   );
}
