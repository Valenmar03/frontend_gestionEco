import { useState } from "react";
import ModalComponent from "../components/ModalComponent";
import { PlusIcon } from "@heroicons/react/20/solid";




export default function ProductsView() {
  const [isOpen, setIsOpen] = useState(false);

   return (
      <main className="bg-gray-50 mx-10 p-10 shadow rounded">
         <h1 className="text-center text-5xl font-bold text-vida-loca-600">
            Productos
         </h1>
         <h2 className="text-center text-xl mt-2 text-vida-loca-600/90">
            Gestioná tu negocio
         </h2>
         <div>
            <button
               onClick={() => setIsOpen(true)}
               className="px-6 py-1 bg-vida-loca-500 text-white font-semibold rounded-lg hover:bg-vida-loca-400 transition cursor-pointer"
            >
              <PlusIcon className="size-12"/>
            </button>
            <ModalComponent isOpen={isOpen} setIsOpen={setIsOpen}/>
         </div>
      </main>
   );
}
