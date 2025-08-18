import { useState } from "react";
import { pages } from "../data";
import { Outlet, Link, useLocation, useParams } from "react-router-dom";
import MonthYearPicker from "../components/MonthYearPicker";

export default function SalesView() {
   const page = pages.find((page) => page.title === "Ventas");
   const { pathname } = useLocation();
   const { id } = useParams();

   const now = new Date();
   const [dateKey, setDateKey] = useState(
      `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`
   );

   const isAddSale = pathname === "/sales/add-sale";
   const isDetail = Boolean(id);

   return (
      <>
         <div className="flex items-center justify-between mb-10 mx-auto">
            <MonthYearPicker value={dateKey} onChange={setDateKey} />

            <div className="text-center">
               <h1 className="text-4xl sm:text-6xl font-bold text-royal-purple-600">
                  {isAddSale ? "Agregar Venta" : page?.title}
               </h1>
               <h2 className="text-xl sm:text-2xl mt-2 text-royal-purple-500/80">
                  {page?.description}
               </h2>
            </div>

            <div className="">
               <Link
                  to={isAddSale || isDetail ? "/sales" : "/sales/add-sale"}
                  className="px-6 py-2 text-lg sm:text-xl bg-royal-purple-600 text-white font-semibold rounded-lg hover:bg-royal-purple-600/80 transition duration-200"
               >
                  {isAddSale || isDetail ? "Volver a Ventas" : "Agregar Venta"}
               </Link>
            </div>
         </div>

         <Outlet context={dateKey}/>
      </>
   );
}
