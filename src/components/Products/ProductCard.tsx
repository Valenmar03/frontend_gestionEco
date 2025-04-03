import { useLocation, useNavigate } from "react-router-dom";
import { Product } from "../../types";
import { formatCurrency } from "../../helpers";
import { TrashIcon } from "@heroicons/react/20/solid";

export default function ProductCard(product: Product) {
   const navigate = useNavigate();
   const location = useLocation();

   return (
      <>
         <div className="grid grid-cols-6 w-full p-4 border-b-1 border-gray-200 items-center">
            <p className="text-lg  text-center">
               {product.type} x {product.weight}{" "}
               {product.haveWeight ? "Kg." : "mL."}
            </p>
            <p className="text-lg text-center">
               {formatCurrency(product.cost)}
            </p>
            <p className="text-lg  text-center">
               {formatCurrency(product.price.wholesalePrice)}
            </p>
            <p className="text-lg  text-center">
               {formatCurrency(product.price.retailPrice)}
            </p>
            <p className="text-lg  text-center">
               {formatCurrency(product.price.mercadoLibrePrice)}
            </p>
            <div className="flex gap-2 items-center">
               <button
                  className=" text-vida-loca-800 text-lg font-semibold mx-auto bg-vida-loca-400 p-2 rounded-md w-1/2 cursor-pointer hover:scale-105 duration-200"
                  onClick={() => {
                     navigate(location.pathname + `?productId=${product._id}`);
                  }}
               >
                  Editar
               </button>
               <TrashIcon
                  className="size-9 text-red-500 cursor-pointer hover:scale-110 duration-200"
                  onClick={() => {
                     navigate(location.pathname + `?confirmDelete=${product._id}`);
                  }}
               />
            </div>
         </div>
      </>
   );
}
