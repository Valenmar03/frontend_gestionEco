import { Product } from "../../types";
import { useLocation, useNavigate } from "react-router-dom";

export default function StockCard(product: Product) {
   const navigate = useNavigate();
   const location = useLocation();

   const { _id, type, weight, stock, haveWeight } = product;
   return (
      <tr className="border-b border-gray-300">
         <td className="px-4 py-3 whitespace-nowrap">
            {type} x {weight} {haveWeight ? "Kg." : "mL."}
         </td>
         <td className="px-4 py-3 whitespace-nowrap">{stock}</td>
         <td className="px-4 py-3 whitespace-nowrap text-lg hidden md:table-cell">
            {stock === 0 ? (
               <span className="inline-flex items-center justify-center rounded-md px-3 py-1  font-semibold bg-red-200 text-red-700">
                  Agotado
               </span>
            ) : stock < 10 ? (
               <span className="inline-flex items-center justify-center rounded-md px-3 py-1  font-semibold bg-yellow-200 text-yellow-700">
                  Poco Stock
               </span>
            ) : (
               <span className="inline-flex items-center justify-center rounded-md px-3 py-1  font-semibold bg-green-200 text-green-700">
                  Disponible
               </span>
            )}
         </td>
         <td className="px-4 py-3">
            <button
               className="w-full md:w-auto text-orange-700 font-semibold text-base md:text-lg bg-orange-400/70 px-3 py-2 rounded-md hover:scale-105 transition duration-200 cursor-pointer"
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
