import { useQuery } from "@tanstack/react-query";
import { getClients } from "../../api/clientAPI";
import { useEffect, useMemo, useState } from "react";
import { Client } from "../../types";
import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "../Spinner";
import ClientCard from "./ClientCard";
import ModalComponent from "../ModalComponent";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/20/solid";
import UpdateClientForm from "./UpdateClientForm";
import DeleteClientModal from "./DeleteClientModal";

export default function ClientList() {
   const [isOpen, setIsOpen] = useState(false);
   const [client, setClient] = useState<Client>();
   const [search, setSearch] = useState("");

   const navigate = useNavigate();
   const location = useLocation();

   const { data, isError, isLoading } = useQuery({
      queryKey: ["clients"],
      queryFn: getClients,
   });

   const queryParams = new URLSearchParams(location.search);
   const clientId = queryParams.get("clientId");
   const confirmDelete = queryParams.get("confirmDelete");
   useEffect(() => {
      if (clientId || confirmDelete) {
         setIsOpen(true);
         if (clientId) {
            setClient(data?.find((client) => client._id === clientId));
         }
         if (confirmDelete) {
            setClient(data?.find((client) => client._id === confirmDelete));
         }
      }
   }, [clientId, confirmDelete]);
   useEffect(() => {
      if (!isOpen) {
         navigate("", { replace: true });
      }
   }, [isOpen]);

   const filteredClients = useMemo(
      () =>
         (data ?? []).filter((client) =>
            `${client.name}`.toLowerCase().includes(search.toLowerCase())
         ),
      [data, search]
   );

   if (isLoading) return <Spinner />;
   if (isError) return <p>Error al cargar los productos</p>;
   return (
      <>
         <div className="flex items-center mb-2 divide-x-2 divide-gray-300 justify-end mt-10">
            <input
               type="text"
               className=" bg-gray-200 p-3 rounded-l-md"
               value={search}
               onChange={(e) => setSearch(e.target.value)}
               placeholder="Busqueda por nombre"
            />
            <MagnifyingGlassIcon className="size-12 text-gray-500 bg-gray-200 p-2 rounded-r-md" />
         </div>
         <table className="min-w-[700px] sm:min-w-full text-lg text-left mt-4">
            <thead className="bg-gray-100 text-xl">
               <tr>
                  <th className="px-4 py-2">Cliente</th>
                  <th className="px-4 py-2">Telefono</th>
                  <th className="px-4 py-2">Direccion</th>
                  <th className="px-4 py-2">CUIL</th>
                  <th className="px-4 py-2">CP</th>
                  <th className="px-4 py-2">Provincia</th>
                  <th className="px-4 py-2">Ciudad</th>
                  <th className="px-4 py-2">Acciones</th>
               </tr>
            </thead>
            <tbody>
               {data ? (
                  filteredClients!.map((client) => (
                     <ClientCard key={client._id} client={client} />
                  ))
               ) : (
                  <p>No hay clientes</p>
               )}
            </tbody>
         </table>
         <ModalComponent isOpen={isOpen} setIsOpen={setIsOpen}>
            {clientId && (
               <>
                  <h2 className="text-3xl font-bold text-flirt-700">
                     Editar Cliente
                  </h2>
                  <p className="mt-2 text-lg opacity-80 text-flirt-700/80">
                     Esta por editar a{" "}
                     <span className="font-semibold">{client?.name}</span>
                  </p>
                  <button
                     onClick={() => setIsOpen(false)}
                     className="absolute top-2 right-2"
                  >
                     <XMarkIcon className="size-6 cursor-pointer hover:text-red-600 duration-200" />
                  </button>
                  <UpdateClientForm client={client!} setIsOpen={setIsOpen} />
               </>
            )}
            {confirmDelete && (
               <DeleteClientModal client={client!} setIsOpen={setIsOpen} />
            )}
         </ModalComponent>
      </>
   );
}
