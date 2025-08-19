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
   errors: { client: string; dto: string; type: string };
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
            cp: "",
            province: "",
            city: "",
         });
         return;
      }
      const selected = clients?.find((c) => c._id === id);
      if (selected) setClient(selected);
   };

   return (
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
         <div className="xl:col-span-6 space-y-2">
            <div className="flex justify-between items-center">
               <label
                  htmlFor="client"
                  className="text-lg sm:text-xl font-medium"
               >
                  Cliente
               </label>
               <Link
                  to="/clients"
                  className="p-1.5 bg-royal-purple-600 text-white rounded-full hover:bg-royal-purple-500 transition"
                  title="Agregar nuevo cliente"
               >
                  <PlusIcon className="size-5" />
               </Link>
            </div>
            <select
               id="client"
               className={`bg-gray-200/50 p-3 rounded-lg text-base sm:text-lg w-full focus:outline-none focus:ring-2 focus:ring-royal-purple-400 ${
                  errors.client ? "border-l-4 border-red-500" : ""
               }`}
               onChange={(e) => handleChangeClient(e.target.value)}
            >
               <option value="0" className="text-gray-500 bg-white">
                  --Seleccione un cliente--
               </option>
               {clients?.map((c) => (
                  <option key={c._id} value={c._id} className="bg-white">
                     {c.name}
                  </option>
               ))}
            </select>
            {errors.client && (
               <p className="text-sm text-red-500">{errors.client}</p>
            )}
         </div>

         <div className="xl:col-span-6">
            <fieldset className="grid grid-cols-2 md:grid-cols-3 gap-4">
               <div className="flex flex-col gap-2">
                  <label
                     htmlFor="iva"
                     className="text-lg sm:text-xl font-medium"
                  >
                     IVA
                  </label>
                  <select
                     id="iva"
                     className="bg-gray-200/50 p-3 rounded-lg text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-royal-purple-400"
                     onChange={(e) => setIva(e.target.value === "true")}
                  >
                     <option value="false" className="bg-white">
                        No
                     </option>
                     <option value="true" className="bg-white">
                        Sí
                     </option>
                  </select>
               </div>
               <div className="flex flex-col gap-2">
                  <label
                     htmlFor="dto"
                     className="text-lg sm:text-xl font-medium"
                  >
                     Descuento
                  </label>
                  <div className="relative">
                     <input
                        type="number"
                        id="dto"
                        className={`bg-gray-200/50 p-3 pr-10 rounded-lg text-base sm:text-lg w-full focus:outline-none focus:ring-2 focus:ring-royal-purple-400 ${
                           errors.dto ? "border-l-4 border-red-500" : ""
                        }`}
                        placeholder="%"
                        onChange={(e) => setDto(+e.target.value)}
                     />
                     <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                        %
                     </span>
                  </div>
                  {errors.dto && (
                     <p className="text-sm text-red-500">{errors.dto}</p>
                  )}
               </div>

               <div className="col-span-2 md:col-span-1 flex flex-col gap-2">
                  <label
                     htmlFor="type"
                     className="text-xl font-medium whitespace-nowrap"
                  >
                     Tipo de Venta
                  </label>
                  <select
                     id="type"
                     className={`bg-gray-200/50 p-3 rounded-lg text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-royal-purple-400 ${
                        errors.type ? "border-l-4 border-red-500" : ""
                     }`}
                     onChange={(e) => setType(e.target.value as SaleType)}
                  >
                     <option value="wholesale" className="bg-white">
                        Mayorista
                     </option>
                     <option value="retail" className="bg-white">
                        Minorista
                     </option>
                     <option value="mercadoLibre" className="bg-white">
                        Mercado Libre
                     </option>
                  </select>
                  {errors.type && (
                     <p className="text-sm text-red-500">{errors.type}</p>
                  )}
               </div>
            </fieldset>
         </div>
      </div>
   );
}
