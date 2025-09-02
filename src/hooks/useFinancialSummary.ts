// hooks/useFinancialSummary.ts
import { useQuery } from "@tanstack/react-query";
import { getSalesByType } from "../api/SalesAPI";
import { getExpensesByMonth, getExpensesSummary } from "../api/expensesAPI";

export function useFinancialSummary(month: number, year: number) {
  return useQuery({
    queryKey: ["financialSummary", month, year],
    queryFn: async () => {
      const [salesByType, expenses, expensesData] = await Promise.all([
        getSalesByType(month, year),
        getExpensesByMonth(month, year),
        getExpensesSummary(month, year)
      ]);
      
      const totalIngresosBrutos = Object.values(salesByType!).reduce((acc, { total }) => acc + total.gross, 0);
      const totalIngresosNetos = Object.values(salesByType!).reduce((acc, { total }) => acc + total.net, 0);

      const totalGastos = expensesData.totalGastos;
      const gananciaNeta = totalIngresosNetos - totalGastos;

      return {
        month,
        year,
        totalIngresosBrutos,
        totalIngresosNetos,
        totalGastos,
        gananciaNeta,
        salesByType,
        expenses
      };
    },
  });
}
