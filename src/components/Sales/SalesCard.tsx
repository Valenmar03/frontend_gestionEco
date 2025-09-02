import { Link } from "react-router-dom";
import { formatCurrency, formatDate, translateType } from "../../helpers";
import { Sale } from "../../types";

export default function SalesCard({ sale }: { sale: Sale }) {
   return (
      <>
         <Link
            to={`/sales/${sale._id}`}
            className="flex flex-col justify-between p-3 bg-gray-50 shadow-md rounded-lg col-span-1 hover:scale-105 duration-300 cursor-pointer"
         >
            <div>
               <p className="text-sm text-right text-royal-purple-700">
                  {formatDate(sale.createdAt)}
               </p>
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
                     <p className="text">{prod.product}</p>
                     <p>{prod.quantity}</p>
                  </div>
               ))}
            </div>
            <div>
               <p className="text-2xl font-bold text-royal-purple-600 mt-4">
                  Total Neto: {formatCurrency(sale.total.net)}
               </p>
               <p className="text-2xl font-bold text-royal-purple-600">
                  Total Bruto: {formatCurrency(sale.total.gross)}
               </p>
            </div>
         </Link>
      </>
   );
}
