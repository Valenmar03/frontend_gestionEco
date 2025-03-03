import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../api/productAPI";

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
         <div>
            {data.map((product) => (
               <div
                  key={product._id}
                  className="flex justify-between items-center p-4 bg-gray-100 shadow rounded"
               >
                  <p className="text-lg">{product.type}</p>
                  <p className="text-lg">
                     {product.weight} {product.haveWeight ? "Kg." : "mL."}
                  </p>
                  <p className="text-lg">{product.price.retailPrice}</p>
               </div>
            ))}
         </div>
      );
}
