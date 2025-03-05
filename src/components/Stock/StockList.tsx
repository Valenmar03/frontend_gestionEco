import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../api/productAPI";
import StockCard from "./StockCard";

export default function StockList() {
   const { data, isError, isLoading } = useQuery({
      queryKey: ["products"],
      queryFn: getProducts,
   });

   if (isLoading) return <p>Cargando...</p>;
   if (isError) return <p>Error al cargar los productos</p>;
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
