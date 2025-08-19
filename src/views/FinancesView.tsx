import { useState } from "react";
import FinancialSummary from "../components/FinancialSummary/FinancialSummary";
import { pages } from "../data";
import MonthYearPicker from "../components/MonthYearPicker";

export default function FinancesView() {
   const page = pages.find((p) => p.title === "Resumen Financiero");
   const now = new Date();
   const [dateKey, setDateKey] = useState(
      `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`
   );

   return (
      <div className="mb-10 mx-auto px-4 overflow-x-hidden">
         <div className="mb-8 flex flex-col-reverse sm:flex-row items-center sm:justify-between gap-4 w-full">
            <MonthYearPicker value={dateKey} onChange={setDateKey} />
            <div className="text-center">
               <h1 className="text-4xl sm:text-6xl font-bold text-monza-500">
                  {page?.title}
               </h1>
               <h2 className="text-xl sm:text-2xl mt-2 text-monza-500/80">
                  {page?.description}
               </h2>
            </div>
            <div className="flex items-center gap-3 self-end sm:self-auto" />
         </div>

         <FinancialSummary date={dateKey} />
      </div>
   );
}
