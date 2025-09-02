// components/FinancialSummary.tsx
import { formatCurrency } from "../../helpers";
import { useFinancialSummary } from "../../hooks/useFinancialSummary";
import Spinner from "../Spinner";
import { ExpensesList } from "./ExpenseList";
import { SalesList } from "./SaleList";
import StatDisclosure from "./StatDisclosure";

export default function FinancialSummary({ date }: { date: string }) {
   const [year, month] = date.split("-");

   const { data, isLoading, error } = useFinancialSummary(+month, +year);

   if (isLoading) return <Spinner></Spinner>;
   if (error || !data) return <p>Error al cargar</p>;

   const { totalIngresosBrutos, totalIngresosNetos, totalGastos, gananciaNeta, salesByType, expenses } = data;

   const cantVentas = Object.values(salesByType!).reduce(
      (acc, { qty }) => acc + qty,
      0
   );

   return (
      <div className="grid grid-cols-1 lg:grid lg:grid-cols-2 xl:grid-cols-3 gap-5 mt-6">
         <StatDisclosure
            title="Ingresos Brutos"
            value={totalIngresosBrutos}
            tone="blue"
         >
            {cantVentas === 0 ? (
               <p className="text-sm">No hay ventas este mes.</p>
            ) : (
               <SalesList sales={salesByType!} type="gross" />
            )}
         </StatDisclosure>

         <StatDisclosure
            title="Ingresos Netos"
            value={totalIngresosNetos}
            tone="green"
         >
            {cantVentas === 0 ? (
               <p className="text-sm">No hay ventas este mes.</p>
            ) : (
               <SalesList sales={salesByType!} type="net" />
            )}
         </StatDisclosure>

         <StatDisclosure
            title="Gastos Mensuales"
            value={totalGastos}
            tone="red"
         >
            <ExpensesList expenses={expenses} />
         </StatDisclosure>

         <StatDisclosure
            title="Ganancia Neta"
            value={gananciaNeta}
            tone={gananciaNeta >= 0 ? "green" : "red"}
         >
            <div className="space-y-1">
               <p>
                  <span className="font-semibold">Ingresos:</span>{" "}
                  {formatCurrency(totalIngresosBrutos)}
               </p>
               <p>
                  <span className="font-semibold">Gastos:</span>{" "}
                  {formatCurrency(totalGastos)}
               </p>
               <p className="border-t pt-2">
                  <span className="font-semibold">Ganancia Neta:</span>{" "}
                  {formatCurrency(gananciaNeta)}
               </p>
            </div>
         </StatDisclosure>

         <StatDisclosure
            title="Cantidad de Ventas"
            value={cantVentas}
            tone="purple"
            format={false}
         >
            <ul className="list-disc pl-5">
               <li>
                  Total de ventas: <b>{cantVentas}</b>
               </li>
               <li>
                  Ticket promedio:{" "}
                  <b>
                     {formatCurrency(
                        cantVentas ? totalIngresosBrutos / cantVentas : 0
                     )}
                  </b>
               </li>
            </ul>
         </StatDisclosure>
      </div>
   );
}
