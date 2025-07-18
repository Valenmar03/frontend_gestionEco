import { pages } from "../data";
import { Outlet, Link, useLocation, useParams } from "react-router-dom";

export default function SalesView() {
   const page = pages.find((page) => page.title === "Ventas");
   const { pathname } = useLocation();
   const { id } = useParams();

   const isAddSale = pathname === "/sales/add-sale";
   const isDetail = Boolean(id);

   return (
      <>
         {/* Header centrado */}
         <div className="flex flex-col items-center justify-center mb-10 relative">
            <div className="text-center">
               <h1 className="text-4xl sm:text-6xl font-bold text-royal-purple-600">
                  {isAddSale ? "Agregar Venta" : page?.title}
               </h1>
               <h2 className="text-xl sm:text-2xl mt-2 text-royal-purple-500/80">
                  {page?.description}
               </h2>
            </div>

            {/* Botón flotante alineado a la derecha en pantallas grandes */}
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
               <Link
                  to={isAddSale || isDetail ? "/sales" : "/sales/add-sale"}
                  className="px-6 py-2 text-lg sm:text-xl bg-royal-purple-600 text-white font-semibold rounded-lg hover:bg-royal-purple-600/80 transition duration-200"
               >
                  {isAddSale || isDetail ? "Volver a Ventas" : "Agregar Venta"}
               </Link>
            </div>
         </div>

         <Outlet />
      </>
   );
}
