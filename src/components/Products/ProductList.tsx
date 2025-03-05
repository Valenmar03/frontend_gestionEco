import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../api/productAPI";
import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";

export default function ProductList() {
   const { data, isError, isLoading } = useQuery({
      queryKey: ["products"],
      queryFn: getProducts,
   });
   console.log(data);

   if (isLoading) return <p>Cargando...</p>;
   if (isError) return <p>Error al cargar los productos</p>;
   if (data)
      return (
         <div className="mt-10">
            <div className="grid grid-cols-4 w-full border-b-4 border-gray-300 pb-4">
               <p className="text-2xl font-bold  text-center">Producto</p>
               <p className="text-2xl font-bold  text-center">Cantidad</p>
               <p className="text-2xl font-bold  text-center">Precio</p>
               <p className="text-2xl font-bold  text-center">Editar</p>
            </div>
            {data.map((product) => (
               <div
                  key={product._id}
                  className="grid grid-cols-4 w-full p-4 border-b-1 border-gray-200"
               >
                  <p className="text-lg  text-center">{product.type} x {product.weight} {product.haveWeight ? "Kg." : "mL."}</p>
                  <p className="text-lg  text-center">
                     {product.weight} {product.haveWeight ? "Kg." : "mL."}
                  </p>
                  <p className="text-lg  text-center">{product.price.retailPrice}</p>
                  <div className="w-full flex justify-center gap-5">
                     <button 
                        className=" text-white bg-blue-500 p-2 rounded-md w-1/2 cursor-pointer hover:scale-105 duration-200"
                        
                     >
                        Editar
                     </button>
                  </div>
               </div>
            ))}
         </div>
      );
}
