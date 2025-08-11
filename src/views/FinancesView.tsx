import FinancialSummary from "../components/FinancialSummary/FinancialSummary";
import { pages } from "../data";

export default function FinancesView() {
   const page = pages.find((p) => p.title === "Resumen Financiero");
   return (
      <div className="relative mb-10">
         <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-monza-500">
               {page?.title}
            </h1>
            <h2 className="text-xl sm:text-2xl mt-2 text-monza-500/80">
               {page?.description}
            </h2>
         </div>
         <FinancialSummary/>
      </div>
   );
}
