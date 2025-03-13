import { pages } from "../data";

export default function BillsViews() {
   const billsPage = pages.filter((page) => page.title === "Facturas")[0];

   return (
      <>
         <div className="grid grid-cols-3">
            <div className=" col-span-1 col-start-2">
               <h1 className="text-center text-6xl font-bold text-sapphire-600">
                  {billsPage.title}
               </h1>
               <h2 className="text-center text-2xl mt-2 text-sapphire-500/80">
                  {billsPage.description}
               </h2>
            </div>
         </div>
      </>
   );
}
