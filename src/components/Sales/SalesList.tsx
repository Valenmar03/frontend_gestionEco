import { useQuery } from "@tanstack/react-query";
import { getSales } from "../../api/SalesAPI";
import Spinner from "../Spinner";
import { formatCurrency, formatDate, translateType } from "../../helpers";

export default function SalesList() {
   const { data, isError, isLoading } = useQuery({
      queryKey: ["sales"],
      queryFn: getSales,
   });

   console.log(data);

   if (isLoading) return <Spinner />;
   if (isError) return <p>Error al cargar los productos</p>;
   if (data)
      return (
         <div className="grid grid-cols-4 gap-4 mt-10">
            {data.map((sale) => (
               <div
                  className="flex flex-col justify-between p-3 bg-white shadow-md rounded-lg col-span-1 hover:scale-105 duration-300 cursor-pointer"
                  key={sale._id}
               >
                  <div>
                     <p className="text-sm text-right text-royal-purple-700">{formatDate(sale.createdAt)}</p>
                     <h2 className="text-2xl font-bold text-royal-purple-600 gap-3 flex items-end">
                        {sale.client.name}
                        <span className="text-base opacity-70">
                           {translateType(sale.type)}
                        </span>
                     </h2>
                     {sale.products.map((prod) => (
                        <div
                           key={prod.product}
                           className="flex justify-between items-center mt-2 first-of-type:border-t-0 border-t-2 border-gray-300"
                        >
                           <p className="text">
                              {prod.product}
                           </p>
                           <p>{prod.quantity}</p>
                        </div>
                     ))}
                  </div>
                  <p className="text-2xl font-bold text-royal-purple-600 mt-4">
                     Total: {formatCurrency(sale.total)}
                  </p>
               </div>
            ))}
         </div>
      );
}
