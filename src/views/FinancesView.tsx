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
      <div className="relative mb-10 ">
         <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between w-6/7">
            <MonthYearPicker value={dateKey} onChange={setDateKey} />
            <div className="text-center">
               <h1 className="text-4xl sm:text-6xl font-bold text-monza-500">
                  {page?.title}
               </h1>
               <h2 className="text-xl sm:text-2xl mt-2 text-monza-500/80">
                  {page?.description}
               </h2>
            </div>
            <div className="flex items-center gap-3 self-end sm:self-auto">
               
            </div>
         </div>
         <FinancialSummary date={dateKey}/>
      </div>
   );
}
