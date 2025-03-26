import { useQuery } from "@tanstack/react-query";
import { getClients } from "../../api/clientAPI";
import { useState } from "react";
import { PlusIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

export default function SalesForm() {
   const [prodArray, setProdArray] = useState([]);

   const { data } = useQuery({
      queryKey: ["clients"],
      queryFn: getClients,
   });

   return (
      <>
         <form className="grid grid-cols-4  bg-white px-20 pt-5 pb-10 rounded-lg shadow-md gap-10 mt-10 w-4/5 mx-auto">
            <h2 className="text-5xl col-span-4 mx-auto font-bold text-royal-purple-500">
               Agregar Venta
            </h2>
            <div className="flex flex-col space-y-2 col-span-2">
               <div className="flex justify-between">
                  <label htmlFor="client" className="text-xl">
                     Cliente
                  </label>
                  <Link
                     className="p-1 bg-royal-purple-600 text-white rounded-full cursor-pointer hover:bg-royal-purple-500 duration-200"
                     to="/clients"
                  >
                     <PlusIcon className="size-6" />
                  </Link>
               </div>
               <select
                  name="client"
                  id="client"
                  className="bg-gray-200/70 p-2 rounded-lg text-lg"
               >
                  <option value="0" className="text-gray-500 bg-white">
                     --Seleccione un cliente--
                  </option>
                  <option value="0" className=" bg-white">
                     Mercado Libre
                  </option>
                  {data?.map((client) => (
                     <option
                        key={client._id}
                        value={client._id}
                        className="bg-white"
                     >
                        {client.name}
                     </option>
                  ))}
               </select>
            </div>
            <div className="flex gap-4 col-span-2">
               <div className="flex flex-col space-y-2 w-1/2">
                  <label htmlFor="iva" className="text-xl">
                     Iva
                  </label>
                  <select
                     name="iva"
                     id="iva"
                     className="bg-gray-200/70 p-2 rounded-lg text-lg"
                  >
                     <option value="1" className="bg-white">
                        Sí
                     </option>
                     <option value="0" className="bg-white">
                        No
                     </option>
                  </select>
               </div>
               <div className="flex flex-col space-y-2 w-1/2">
                  <label htmlFor="dto" className="text-xl">
                     Descuento
                  </label>
                  <input
                     type="number"
                     id="dto"
                     className="bg-gray-200/70 p-2 rounded-lg text-lg"
                     placeholder="% de Dto."
                  />
               </div>
            </div>
            <div className="flex flex-col space-y-2 col-span-1">
               <label htmlFor="type" className="text-xl">
                  Tipo de Venta
               </label>
               <select
                  name="type"
                  id="type"
                  className="bg-gray-200/70 p-2 rounded-lg text-lg"
               >
                  <option value="wholesalePrice" className="bg-white">
                     Mayorista
                  </option>
                  <option value="retailPrice" className="bg-white">
                     Minorista
                  </option>
                  <option value="MercadoLibrePrice" className="bg-white">
                     Mercado Libre
                  </option>
               </select>
            </div>
            <div className=" flex flex-col col-span-3 space-y-2">
            <div className="flex justify-between">
                <label htmlFor="products" className="text-xl">
                    Productos
                </label>
               </div>
               
               <div className="bg-gray-200/70 p-2 rounded-lg text-lg">
                  {prodArray.length === 0 ? (
                     <>
                        <p>Aún no hay productos.</p>
                     </>
                  ) : (
                     <p>Aún no hay productos.</p>
                  )}
               </div>
            </div>
         </form>
      </>
   );
}
