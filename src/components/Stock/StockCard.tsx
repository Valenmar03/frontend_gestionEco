import { Product } from "../../types";
import { useLocation, useNavigate } from "react-router-dom";

export default function StockCard(product: Product) {
   const navigate = useNavigate();
   const location = useLocation();

   const { _id, type, weight, stock, haveWeight } = product;
   return (
      <tr className="border-b border-gray-300">
         <td className="px-4 py-3  whitespace-nowrap">
            {type} x {weight} {haveWeight ? "Kg." : "mL."}
         </td>
         <td className="px-4 py-3  whitespace-nowrap">{stock}</td>
         <td className="px-4 py-3  whitespace-nowrap">
            {stock === 0 ? (
               <p className="text-lg text-center bg-red-200 p-2 w-1/2  text-red-700 rounded-md">
                  Agotado
               </p>
            ) : stock < 10 ? (
               <p className="text-lg text-center bg-yellow-200 p-2 w-1/2  text-yellow-700 rounded-md">
                  Poco Stock
               </p>
            ) : (
               <p className="text-lg text-center  bg-green-200 p-2 w-1/2  text-green-700 rounded-md">
                  Disponible
               </p>
            )}
         </td>
         <td className="px-4 py-3">
            <button
               className=" text-orange-700 font-semibold text-lg bg-orange-400/70 p-2 rounded-md w-1/2 cursor-pointer hover:scale-105 duration-200"
               onClick={() => {
                  navigate(location.pathname + `?productId=${_id}`);
               }}
            >
               Stock Individual
            </button>
         </td>
      </tr>
   );
}
