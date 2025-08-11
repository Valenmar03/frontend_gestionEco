// hooks/useFinancialSummary.ts
import { useQuery } from "@tanstack/react-query";
import { getSalesByMonth } from "../api/SalesAPI";
import { getExpensesByMonth, getExpensesSummary } from "../api/expensesAPI";

export function useFinancialSummary(month: number, year: number) {
  return useQuery({
    queryKey: ["financialSummary", month, year],
    queryFn: async () => {
      const [sales, expenses, expensesData] = await Promise.all([
        getSalesByMonth(month, year),
        getExpensesByMonth(month, year),
        getExpensesSummary(month, year)
      ]);
      
      const totalIngresos = sales!.reduce((acc, s) => acc + s.total, 0);
      const totalGastos = expensesData.totalGastos;
      const gananciaNeta = totalIngresos - totalGastos;

      return {
        month,
        year,
        totalIngresos,
        totalGastos,
        gananciaNeta,
        sales,
        expenses
      };
    },
  });
}
