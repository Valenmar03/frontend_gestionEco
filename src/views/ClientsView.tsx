import { useState } from "react";
import { pages } from "../data";
import ModalComponent from "../components/ModalComponent";
import { XMarkIcon } from "@heroicons/react/20/solid";
import ClientForm from "../components/Clients/ClientForm";
import ClientList from "../components/Clients/ClientList";

export default function ClientsView() {
   const page = pages.filter((page) => page.title === "Clientes")[0];
   const [isOpen, setIsOpen] = useState(false);

   return (
      <>
         <div className="grid grid-cols-3">
            <div className=" col-span-1 col-start-2">
            <h1 className="text-center text-6xl font-bold text-flirt-600">
                  {page.title}
               </h1>
               <h2 className="text-center text-2xl mt-2 text-flirt-600/80">
                  {page.description}
               </h2>
            </div>
            <div className="col-span-1 col-start-3 my-auto ml-auto">
               <button
                  onClick={() => setIsOpen(true)}
                  className={`px-6 py-2 text-2xl bg-flirt-600 text-white font-semibold rounded-lg hover:bg-flirt-600/80 cursor-pointer duration-200`}
               >
                  Añadir Cliente
               </button>
            </div>
         </div>
         <ClientList />
         <ModalComponent isOpen={isOpen} setIsOpen={setIsOpen}>
            <h2 className="text-3xl font-bold text-flirt-700">Añadir Cliente</h2>
            <p className="opacity-80 text-flirt-700/80">
               Ingrese todos los datos necesarios para poder crear al cliente
            </p>
            <button
               onClick={() => setIsOpen(false)}
               className="absolute top-2 right-2"
            >
               <XMarkIcon className="size-6 cursor-pointer hover:text-red-600 duration-200" />
            </button>
            <ClientForm setIsOpen={setIsOpen}/>
         </ModalComponent>
      </>
   );
}
