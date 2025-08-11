import { Expense } from "../../types";
import { format } from "date-fns";

export function ExpensesList({ expenses }: { expenses: Expense[] }) {
  if (!expenses?.length) return <p className="text-sm">No hay gastos cargados este mes.</p>;
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
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
              <td className="py-2 pr-4">{format(new Date(e.date), "dd MMM")}</td>
              <td className="py-2 pr-4">{e.description}</td>
              <td className="py-2 pr-4">{e.category ?? "—"}</td>
              <td className="py-2 pr-0 text-right font-semibold">
                {e.amount.toLocaleString("es-AR", { style: "currency", currency: "ARS" })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}