import { useState } from "react";
import ModalComponent from "../components/ModalComponent";
import { PlusIcon, XMarkIcon } from "@heroicons/react/20/solid";
import ProductForm from "../components/Products/ProductForm";

export default function ProductsView() {
   const [isOpen, setIsOpen] = useState(false);

   return (
      <main className="bg-gray-50 mx-10 p-10 shadow rounded">
         <div className="flex justify-between items-center">
            <div className="mx-auto">
               <h1 className="text-center text-5xl font-bold text-vida-loca-600">
                  Productos
               </h1>
               <h2 className="text-center text-xl mt-2 text-vida-loca-600/90">
                  Administrá tus productos
               </h2>
            </div>
            <button
               onClick={() => setIsOpen(true)}
               className="px-6 py-1 bg-vida-loca-500 text-white font-semibold rounded-lg hover:bg-vida-loca-400 transition cursor-pointer"
            >
               <PlusIcon className="size-12" />
            </button>
         </div>
         <ModalComponent isOpen={isOpen} setIsOpen={setIsOpen}>
            <h2 className="text-3xl font-bold ">Agregar Producto</h2>
            <p className="mt-2 opacity-80">
               Ingrese todos los datos necesarios para poder agregar el producto
            </p>
            <button
               onClick={() => setIsOpen(false)}
               className="absolute top-2 right-2"
            >
               <XMarkIcon className="size-6 cursor-pointer hover:text-red-600 duration-200" />
            </button>
            <ProductForm/>
         </ModalComponent>
      </main>
   );
}
