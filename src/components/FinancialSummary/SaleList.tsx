import { formatCurrency } from "../../helpers";
import { Sale } from "../../types";
import { format } from "date-fns";

export function SalesList({ sales }: { sales: Sale[] }) {
  if (!sales?.length) return <p className="text-sm">No hay ventas este mes.</p>;
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
          {sales.map((s) => (
            <tr key={s._id} className="border-t border-gray-200">
              <td className="py-2 pr-4">{format(new Date(s.createdAt), "dd MMM")}</td>
              <td className="py-2 pr-4">{s.client?.name ?? "—"}</td>
              <td className="py-2 pr-0 text-right font-semibold">
                {formatCurrency(s.total)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}