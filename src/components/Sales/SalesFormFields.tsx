import { PlusIcon } from "@heroicons/react/20/solid";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getClients } from "../../api/clientAPI";
import { Client, SaleType } from "../../types";

type SalesFormFieldsProps = {
   setClient: React.Dispatch<React.SetStateAction<Client>>;
   setIva: React.Dispatch<React.SetStateAction<boolean>>;
   setDto: React.Dispatch<React.SetStateAction<number>>;
   setType: React.Dispatch<React.SetStateAction<SaleType>>;
   errors: {
      client: string;
      dto: string;
      type: string;
   };
};

export default function SalesFormFields({
   setClient,
   setIva,
   setDto,
   setType,
   errors,
}: SalesFormFieldsProps) {
   const { data: clients } = useQuery({
      queryKey: ["clients"],
      queryFn: getClients,
   });

   const handleChangeClient = (id: string) => {
      if (id === "0") {
         setClient({
            _id: "",
            name: "",
            phoneNumber: "",
            address: "",
            cuil: "",
         });
         return;
      }

      const selected = clients?.find((client) => client._id === id);
      if (selected) setClient(selected);
   };

   return (
      <>
         {/* Cliente */}
         <div className="flex flex-col space-y-2 col-span-3">
            <div className="flex justify-between items-center">
               <label htmlFor="client" className="text-xl font-medium">
                  Cliente
               </label>
               <Link
                  to="/clients"
                  className="p-1 bg-royal-purple-600 text-white rounded-full hover:bg-royal-purple-500 transition duration-200"
                  title="Agregar nuevo cliente"
               >
                  <PlusIcon className="size-6" />
               </Link>
            </div>

            <select
               name="client"
               id="client"
               className={`bg-gray-200/50 p-2 rounded-lg text-lg ${
                  errors.client && "border-l-4 border-red-500"
               }`}
               onChange={(e) => handleChangeClient(e.target.value)}
            >
               <option value="0" className="text-gray-500 bg-white">
                  --Seleccione un cliente--
               </option>
               {clients?.map((client) => (
                  <option key={client._id} value={client._id} className="bg-white">
                     {client.name}
                  </option>
               ))}
            </select>

            {errors.client && (
               <p className="text-base text-red-500">{errors.client}</p>
            )}
         </div>

         {/* IVA / Dto / Tipo de venta */}
         <fieldset className="flex gap-4 col-span-3">
            {/* IVA */}
            <div className="flex flex-col space-y-2 w-1/4">
               <label htmlFor="iva" className="text-xl font-medium">
                  IVA
               </label>
               <select
                  name="iva"
                  id="iva"
                  className="bg-gray-200/50 p-2 rounded-lg text-lg"
                  onChange={(e) => setIva(e.target.value === "true")}
               >
                  <option value="false" className="bg-white">No</option>
                  <option value="true" className="bg-white">Sí</option>
               </select>
            </div>

            {/* Descuento */}
            <div className="flex flex-col space-y-2 w-1/4">
               <label htmlFor="dto" className="text-xl font-medium">
                  Descuento
               </label>
               <div className="relative">
                  <input
                     type="number"
                     id="dto"
                     className={`bg-gray-200/50 p-2 pr-10 rounded-lg text-lg w-full ${
                        errors.dto && "border-l-4 border-red-500"
                     }`}
                     placeholder="%"
                     onChange={(e) => setDto(+e.target.value)}
                  />
                  <span className="absolute right-3 top-2 text-gray-500 text-xl">%</span>
               </div>
               {errors.dto && (
                  <p className="text-base text-red-500">{errors.dto}</p>
               )}
            </div>

            {/* Tipo de venta */}
            <div className="flex flex-col space-y-2 w-full">
               <label htmlFor="type" className="text-xl font-medium">
                  Tipo de Venta
               </label>
               <select
                  name="type"
                  id="type"
                  className={`bg-gray-200/50 p-2 rounded-lg text-lg ${
                     errors.type && "border-l-4 border-red-500"
                  }`}
                  onChange={(e) => setType(e.target.value as SaleType)}
               >
                  <option value="wholesalePrice" className="bg-white">Mayorista</option>
                  <option value="retailPrice" className="bg-white">Minorista</option>
                  <option value="mercadoLibrePrice" className="bg-white">Mercado Libre</option>
               </select>
               {errors.type && (
                  <p className="text-base text-red-500">{errors.type}</p>
               )}
            </div>
         </fieldset>
      </>
   );
}
