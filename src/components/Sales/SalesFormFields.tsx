import { PlusIcon } from "@heroicons/react/20/solid";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getClients } from "../../api/clientAPI";

export default function () {
    const { data: clients } = useQuery({
          queryKey: ["clients"],
          queryFn: getClients,
       });
  return (
    <>
      <div className="flex flex-col space-y-2 col-span-3">
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
                  className="bg-gray-200/50 p-2 rounded-lg text-lg"
               >
                  <option value="0" className="text-gray-500 bg-white">
                     --Seleccione un cliente--
                  </option>
                  <option value="0" className=" bg-white">
                     Mercado Libre
                  </option>
                  {clients?.map((client) => (
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
                     className="bg-gray-200/50 p-2 rounded-lg text-lg"
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
                     className="bg-gray-200/50 p-2 rounded-lg text-lg"
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
                  className="bg-gray-200/50 p-2 rounded-lg text-lg"
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
    </>
  )
}
