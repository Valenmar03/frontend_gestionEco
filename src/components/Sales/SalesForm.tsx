import SalesFormFields from "./SalesFormFields";
import SalesFormProds from "./SalesFormProds";

export default function SalesForm() {
   return (
      <>
         <form className="grid grid-cols-6  bg-white px-20 pt-5 pb-10 rounded-lg shadow-md gap-10 mt-10 w-4/5 mx-auto">
            <h2 className="text-5xl col-span-6 mx-auto font-bold text-royal-purple-500">
               Agregar Venta
            </h2>

            <SalesFormFields />

            <SalesFormProds />
         </form>
      </>
   );
}
