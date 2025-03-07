
import { Product } from "../../types";
import StockCard from "./StockCard";

export default function StockList({data} : {data: Product[]}) {
   
   return (
      <>
         <div className="mt-10">
            <div className="grid grid-cols-4 w-full border-b-4 border-gray-300 pb-4">
               <p className="text-2xl font-bold  text-center">Producto</p>
               <p className="text-2xl font-bold  text-center">Stock</p>
               <p className="text-2xl font-bold  text-center">Estado</p>
            </div>
            {data ? (
               data.map((product) => (
                  <StockCard key={product._id} {...product} />
               ))
            ) : (
               <p>No hay productos</p>
            )}
         </div>
      </>
   );
}
