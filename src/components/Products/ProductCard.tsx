import { useLocation, useNavigate } from "react-router-dom";
import { Product } from "../../types";
import { formatCurrency } from "../../helpers";
import { TrashIcon } from "@heroicons/react/20/solid";

export default function ProductCard(product: Product) {
   const navigate = useNavigate();
   const location = useLocation();

   return (
      <tr className="border-b border-gray-300">
         <td className="px-4 py-3  whitespace-nowrap">
            {product.type} x {product.weight}{" "}
            {product.haveWeight ? "Kg." : "mL."}
         </td>
         <td className="px-4 py-3  whitespace-nowrap">
            {formatCurrency(product.cost)}
         </td>
         <td className="px-4 py-3  whitespace-nowrap">
            {formatCurrency(
               product.revenuePercentage.wholesale * product.cost + product.cost
            )} 
            <strong> (%{Math.round(product.revenuePercentage.wholesale * 100)})</strong>
         </td>
         <td className="px-4 py-3  whitespace-nowrap">
            {formatCurrency(
               product.revenuePercentage.retail * product.cost + product.cost
            )}
            <strong> (%{Math.round(product.revenuePercentage.retail * 100)})</strong>
         </td>
         <td className="px-4 py-3  whitespace-nowrap">
            {formatCurrency(
               product.revenuePercentage.mercadoLibre * product.cost +
                  product.cost
            )}{" "}
            <strong> (%{Math.round(product.revenuePercentage.mercadoLibre * 100)})</strong>
         </td>
         <td className="px-4 py-3">
            <div className="flex justify-around gap-2  items-center">
               <button
                  className="bg-vida-loca-400 hover:bg-vida-loca-500 text-white font-semibold px-4 py-2 rounded transition duration-200 cursor-pointer"
                  onClick={() =>
                     navigate(`${location.pathname}?productId=${product._id}`)
                  }
               >
                  Editar
               </button>
               <TrashIcon
                  className="size-8 text-red-500 cursor-pointer hover:scale-110 transition"
                  onClick={() =>
                     navigate(
                        `${location.pathname}?confirmDelete=${product._id}`
                     )
                  }
               />
            </div>
         </td>
      </tr>
   );
}
