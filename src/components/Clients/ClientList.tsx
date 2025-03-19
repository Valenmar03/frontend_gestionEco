import { useQuery } from "@tanstack/react-query";
import { getClients } from "../../api/client";
import { useEffect, useState } from "react";
import { Client } from "../../types";
import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "../Spinner";
import ClientCard from "./ClientCard";
import ModalComponent from "../ModalComponent";
import { XMarkIcon } from "@heroicons/react/20/solid";

export default function ClientList() {
   const [isOpen, setIsOpen] = useState(false);
   const [client, setClient] = useState<Client>();

   const navigate = useNavigate();
   const location = useLocation();

   const { data, isError, isLoading } = useQuery({
      queryKey: ["clients"],
      queryFn: getClients,
   });

   const queryParams = new URLSearchParams(location.search);
   const clientId = queryParams.get("clientId");
   useEffect(() => {
      if (clientId) {
         setIsOpen(true);
         setClient(data?.find((client) => client._id === clientId));
      }
   }, [clientId]);
   useEffect(() => {
      if (!isOpen) {
         navigate("", { replace: true });
      }
   }, [isOpen]);

   if (isLoading) return <Spinner />;
   if (isError) return <p>Error al cargar los productos</p>;
   return (
      <>
         <div className="mt-10">
            <div className="grid grid-cols-5 w-full border-b-4 border-gray-300 pb-4">
               <p className="text-2xl font-bold  text-center">Cliente</p>
               <p className="text-2xl font-bold  text-center">Telefono</p>
               <p className="text-2xl font-bold  text-center">Direccion</p>
               <p className="text-2xl font-bold  text-center">CUIL</p>
            </div>
            {data ? (
               data.map((client) => (
                  <ClientCard key={client._id} client={client}/>
               ))
            ) : (
               <p>No hay clientes</p>
            )}
         </div>
         <ModalComponent isOpen={isOpen} setIsOpen={setIsOpen}>
            <h2 className="text-3xl font-bold text-flirt-700">Editar Cliente</h2>
            <p className="mt-2 text-lg opacity-80 text-flirt-700/80">
               Esta por editar a <span className="font-semibold">{client?.name}</span>
            </p>
            <button
               onClick={() => setIsOpen(false)}
               className="absolute top-2 right-2"
            >
               <XMarkIcon className="size-6 cursor-pointer hover:text-red-600 duration-200" />
            </button>
            {/* <UpdateProductForm product={client!} setIsOpen={setIsOpen} /> */}
         </ModalComponent>
      </>
   );
}
