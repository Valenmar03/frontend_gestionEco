import { saleByTypeTotal } from "../../api/SalesAPI";
import { formatCurrency } from "../../helpers";

export function SalesList({ sales }: { sales: saleByTypeTotal }) {

   return (
      <div className="overflow-x-auto">
         <table className="min-w-full">
            <thead className="text-gray-600">
               <tr>
                  <th className="py-2 pr-4 text-left">Tipo</th>
                  <th className="py-2 pr-4 text-left">Cantidad</th>
                  <th className="py-2 pr-0 text-right">Total</th>
               </tr>
            </thead>
            <tbody>
                     <tr key="wholesale" className="border-t border-gray-200">
                        <td className="py-2 pr-4">
                           Mayorista
                        </td>
                        <td className="py-2 pr-4">{sales.wholesale.qty}</td>
                        <td className="py-2 pr-0 text-right font-semibold">
                           {formatCurrency(sales.wholesale.total)}
                        </td>
                     </tr>
                     <tr key="retail" className="border-t border-gray-200">
                        <td className="py-2 pr-4">
                           Minorista
                        </td>
                        <td className="py-2 pr-4">{sales.retail.qty}</td>
                        <td className="py-2 pr-0 text-right font-semibold">
                           {formatCurrency(sales.retail.total)}
                        </td>
                     </tr>
                     <tr key="mercadoLibre" className="border-t border-gray-200">
                        <td className="py-2 pr-4">
                           ML
                        </td>
                        <td className="py-2 pr-4">{sales.mercadoLibre.qty}</td>
                        <td className="py-2 pr-0 text-right font-semibold">
                           {formatCurrency(sales.mercadoLibre.total)}
                        </td>
                     </tr>
            </tbody>
         </table>
      </div>
   );
}
