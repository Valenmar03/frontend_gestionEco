import StockList from "../components/Stock/StockList";

export default function StockManagmentView() {
   return (
      <>
         <div className="grid grid-cols-3">
            <div className=" col-span-1 col-start-2">
               <h1 className="text-center text-6xl font-bold text-orange-400">
                  Control de Stock
               </h1>
               <h2 className="text-center text-2xl mt-2 text-orange-400/80">
                  Maneja el stock de tus productos
               </h2>
            </div>
            <div className="col-span-1 col-start-3 my-auto ml-auto">
               <button
                  //onClick={() => setIsOpen(true)}
                  className="px-6 py-2 text-2xl bg-orange-400 text-white font-semibold rounded-lg hover:bg-orange-400/80 cursor-pointer duration-200"
               >
                  Stock Masivo
               </button>
            </div>
         </div>
         <div>
            <StockList />
         </div>
      </>
   );
}
