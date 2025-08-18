import { formatCurrency, formatYMD } from "../../helpers";
import { Sale } from "../../types";

export function SalesList({ sales }: { sales: Sale[] }) {
   if (!sales?.length)
      return <p className="text-sm">No hay ventas este mes.</p>;

   return (
      <div className="overflow-x-auto">
         <table className="min-w-full">
            <thead className="text-gray-600">
               <tr>
                  <th className="py-2 pr-4 text-left">Fecha</th>
                  <th className="py-2 pr-4 text-left">Cliente</th>
                  <th className="py-2 pr-0 text-right">Total</th>
               </tr>
            </thead>
            <tbody>
               {sales.map((s) => {
                  const date = new Date(s.createdAt);
                  const formattedDate = `${date.getFullYear()}-${String(
                     date.getMonth() + 1
                  ).padStart(2, "0")}-${String(date.getDate()).padStart(
                     2,
                     "0"
                  )}`;

                  return (
                     <tr key={s._id} className="border-t border-gray-200">
                        <td className="py-2 pr-4">
                           {formatYMD(formattedDate)}
                        </td>
                        <td className="py-2 pr-4">{s.client?.name ?? "—"}</td>
                        <td className="py-2 pr-0 text-right font-semibold">
                           {formatCurrency(s.total)}
                        </td>
                     </tr>
                  );
               })}
            </tbody>
         </table>
      </div>
   );
}
