import { formatCurrency, formatYMD } from "../../helpers";
import { Expense } from "../../types";

export function ExpensesList({ expenses }: { expenses: Expense[] }) {
   if (!expenses?.length)
      return <p className="text-sm">No hay gastos cargados este mes.</p>;
   return (
      <div className="overflow-x-auto">
         <table className="min-w-full">
            <thead className="text-gray-600">
               <tr>
                  <th className="py-2 pr-4 text-left">Fecha</th>
                  <th className="py-2 pr-4 text-left">Descripción</th>
                  <th className="py-2 pr-4 text-left">Categoría</th>
                  <th className="py-2 pr-0 text-right">Monto</th>
               </tr>
            </thead>
            <tbody>
               {expenses.map((e) => (
                  <tr key={e._id} className="border-t border-gray-200">
                     <td className="py-2 pr-4">
                        {formatYMD(e.date)}
                     </td>
                     <td className="py-2 pr-4">{e.description}</td>
                     <td className="py-2 pr-4">{e.category ?? "—"}</td>
                     <td className="py-2 pr-0 text-right font-semibold">
                        {formatCurrency(e.amount)}
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
}
