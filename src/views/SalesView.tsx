import { useState } from "react";
import { pages } from "../data";
import { Outlet } from "react-router-dom";

export default function SalesView() {
   const page = pages.filter((page) => page.title === "Ventas")[0];
   const [isOpen, setIsOpen] = useState(false);

   return (
      <>
         <div className="grid grid-cols-3">
            <div className=" col-span-1 col-start-2">
               <h1 className="text-center text-6xl font-bold text-royal-purple-600">
                  {page.title}
               </h1>
               <h2 className="text-center text-2xl mt-2 text-royal-purple-500/80">
                  {page.description}
               </h2>
            </div>
            <div className="col-span-1 col-start-3 my-auto ml-auto">
               <button
                  onClick={() => setIsOpen(true)}
                  className={`px-6 py-2 text-2xl bg-royal-purple-600 text-white font-semibold rounded-lg hover:bg-royal-purple-600/80 cursor-pointer duration-200 `}
               >
                  Agregar Venta
               </button>
            </div>
         </div>
         <Outlet />
      </>
   );
}
