import { XMarkIcon } from "@heroicons/react/20/solid";

type ModalComponentProps = {
   isOpen: boolean;
   setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ModalComponent({
   isOpen,
   setIsOpen,
}: ModalComponentProps) {
   return (
      <div
         className="flex justify-center items-center min-h-screen"
         onClick={() => setIsOpen(false)}
      >
         {isOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
               <div
                  className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full transform scale-95 opacity-100 animate-fade-in relative"
                  onClick={(e) => e.stopPropagation()}
               >
                  <h2 className="text-3xl font-bold ">
                     Agregar Producto
                  </h2>
                  <p className="mt-2 text-lg opacity-80">
                     Ingrese todos los datos necesarios para poder agregar el producto
                  </p>
                  <button
                     onClick={() => setIsOpen(false)}
                     className="absolute top-2 right-2"
                  >
                     <XMarkIcon className="size-6 cursor-pointer hover:text-red-600 duration-200"/>
                  </button>
               </div>
            </div>
         )}
      </div>
   );
}
