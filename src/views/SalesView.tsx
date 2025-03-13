import { pages } from "../data";

export default function SalesView() {
   const salesPage = pages.filter((page) => page.title === "Ventas")[0];

   return (
      <>
         <div className="grid grid-cols-3">
            <div className=" col-span-1 col-start-2">
               <h1 className="text-center text-6xl font-bold text-royal-purple-600">
                  {salesPage.title}
               </h1>
               <h2 className="text-center text-2xl mt-2 text-royal-purple-500/80">
                  {salesPage.description}
               </h2>
            </div>
         </div>
      </>
   );
}
