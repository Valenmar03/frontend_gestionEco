import { useState } from "react";
import SalesFormFields from "./SalesFormFields";
import SalesFormProds from "./SalesFormProds";
import { Client } from "../../types";

export default function SalesForm() {
   const [ cliente, setCliente ] = useState<Client>({
      _id: "",
      name: "",
      phoneNumber: "",
      address: "",
      cuil: "",
   });
   const [ iva, setIva ] = useState(false)
   const [ dto, setDto ] = useState(0)
   const [ type, setType ] = useState("")

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      console.log(cliente, iva, dto, type)
   };

   return (
      <>
         <form
            onSubmit={handleSubmit}
            className="grid grid-cols-6  bg-white px-20 pt-5 pb-10 rounded-lg shadow-md gap-10 mt-10 w-4/5 mx-auto"
         >
            <h2 className="text-5xl col-span-6 mx-auto font-bold text-royal-purple-500">
               Agregar Venta
            </h2>
            <SalesFormFields setCliente={setCliente} setIva={setIva} setDto={setDto} setType={setType} />
            <SalesFormProds />
            <input
               type="submit"
               value="Crear Venta"
               className="col-span-6 text-3xl bg-royal-purple-600 text-white font-semibold w-4/5 mx-auto p-2 rounded-md hover:bg-royal-purple-500 cursor-pointer duration-200"
            />
         </form>
      </>
   );
}
