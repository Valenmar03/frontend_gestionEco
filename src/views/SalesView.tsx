import { pages } from "../data";
import { Outlet, Link, useLocation } from "react-router-dom";

export default function SalesView() {
   const page = pages.filter((page) => page.title === "Ventas")[0];
   const { pathname } = useLocation();
   const isAddSale = pathname === "/sales/add-sale";

   return (
      <>
         <div className="grid grid-cols-3">
            <div className=" col-span-1 col-start-2">
               <h1 className="text-center text-6xl font-bold text-royal-purple-600">
                  {isAddSale ? "Agregar Venta" : page.title}
               </h1>
               <h2 className="text-center text-2xl mt-2 text-royal-purple-500/80">
                  {page.description}
               </h2>
            </div>
            <div className="col-span-1 col-start-3 my-auto ml-auto">
               <Link
                  to={isAddSale ? "/sales" : "/sales/add-sale"}
                  className={`px-6 py-2 text-2xl bg-royal-purple-600 text-white font-semibold rounded-lg hover:bg-royal-purple-600/80 cursor-pointer duration-200 `}
               >
                  {isAddSale ? "Volver a Ventas" : "Agregar Venta"}
               </Link>
            </div>
         </div>
         <Outlet/>
      </>
   );
}
