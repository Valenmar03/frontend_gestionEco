import { useState } from "react";
import { pages } from "../data";
import ModalComponent from "../components/ModalComponent";

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
               <h2 className="text-center text-2xl mt-2 text-flirt-500/80">
                  {page.description}
               </h2>
            </div>
         </div>

         <ModalComponent isOpen={isOpen} setIsOpen={setIsOpen}>
            <>
            </>
         </ModalComponent>
      </>
   );
}
