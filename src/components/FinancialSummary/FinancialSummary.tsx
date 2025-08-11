// components/FinancialSummary.tsx
import { useFinancialSummary } from "../../hooks/useFinancialSummary";
import Spinner from "../Spinner";
import { ExpensesList } from "./ExpenseList";
import { SalesList } from "./SaleList";
import StatDisclosure from "./StatDisclosure";

export default function FinancialSummary() {
   const now = new Date();
   const month = now.getMonth() + 1;
   const year = now.getFullYear();

   const { data, isLoading, error } = useFinancialSummary(month, year);

   if (isLoading) return <Spinner></Spinner>;
   if (error || !data) return <p>Error al cargar</p>;

   const { totalIngresos, totalGastos, gananciaNeta, sales, expenses } =
      data;

      const cantVentas = sales!.length

      return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatDisclosure title="Ingresos Totales" value={totalIngresos} tone="green">
          <SalesList sales={sales!} />
        </StatDisclosure>

        <StatDisclosure title="Gastos Mensuales" value={totalGastos} tone="red">
          <ExpensesList expenses={expenses} />
        </StatDisclosure>

        <StatDisclosure
          title="Ganancia Neta"
          value={gananciaNeta}
          tone={gananciaNeta >= 0 ? "green" : "red"}
        >
          <div className="text-sm space-y-1">
            <p><span className="font-semibold">Ingresos:</span> {totalIngresos.toLocaleString("es-AR", { style: "currency", currency: "ARS" })}</p>
            <p><span className="font-semibold">Gastos:</span> {totalGastos.toLocaleString("es-AR", { style: "currency", currency: "ARS" })}</p>
            <p className="border-t pt-2"><span className="font-semibold">Ganancia Neta:</span> {gananciaNeta.toLocaleString("es-AR", { style: "currency", currency: "ARS" })}</p>
          </div>
        </StatDisclosure>

        <StatDisclosure title="Cantidad de Ventas" value={cantVentas} tone="purple">
          <ul className="text-sm list-disc pl-5">
            <li>Total de ventas: <b>{cantVentas}</b></li>
            <li>Ticket promedio: <b>{(cantVentas ? totalIngresos / cantVentas : 0).toLocaleString("es-AR", { style: "currency", currency: "ARS" })}</b></li>
          </ul>
        </StatDisclosure>
      </div>
      )
}
