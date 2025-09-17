import { Link } from "react-router-dom";
import { formatCurrency, formatDate, translateType } from "../../helpers";
import { Sale } from "../../types";

export default function SalesCard({ sale }: { sale: Sale }) {
   return (
      <>
         <Link
            to={`/sales/${sale._id}`}
            className="flex flex-col justify-between bg-royal-purple-100 shadow-lg rounded-2xl p-5 hover:shadow-xl hover:-translate-y-1 duration-300 cursor-pointer"
         >
            <div className="flex items-center justify-between mb-1">
               <div>
                  <h2 className="text-2xl font-semibold text-royal-purple-700">
                     {sale.client.name}
                  </h2>
                  <span className="text-sm text-royal-purple-500">
                     {translateType(sale.type)}
                  </span>
               </div>
               <p className="text-sm text-gray-500">
                  {formatDate(sale.createdAt)}
               </p>
            </div>

            <div className="divide-y divide-gray-200">
               {sale.products.map((prod) => (
                  <div
                     key={prod.product}
                     className="flex justify-between py-2 text-gray-700"
                  >
                     <p className="truncate">{prod.product}</p>
                     <p className="font-medium">{prod.quantity}</p>
                  </div>
               ))}
            </div>

            <div className="mt-2 border-t border-gray-200 pt-4">
               <p className="text-sm text-gray-500">Total Neto</p>
               <p className="text-lg font-semibold text-royal-purple-600">
                  {formatCurrency(sale.total.net)}
               </p>
               <p className="text-sm font-bold text-gray-500 mt-2">Total Bruto</p>
               <p className="text-2xl font-bold text-royal-purple-700">
                  {formatCurrency(sale.total.gross)}
               </p>
            </div>
         </Link>
      </>
   );
}
