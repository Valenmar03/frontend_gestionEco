import { useEffect } from "react";

type ModalComponentProps = {
   isOpen: boolean;
   setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
   children: React.ReactNode;
};

export default function ModalComponent({
   isOpen,
   setIsOpen,
   children,
}: ModalComponentProps) {
   useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
         if (e.key === "Escape") setIsOpen(false);
      };

      if (isOpen) {
         document.addEventListener("keydown", handleKeyDown);
      }

      return () => {
         document.removeEventListener("keydown", handleKeyDown);
      };
   }, [isOpen, setIsOpen]);

   if (!isOpen) return null;

   return (
      <div  
         className="fixed inset-0 z-50 flex lg:items-center justify-center bg-black/50"
         onClick={() => setIsOpen(false)}
         aria-modal="true"
         role="dialog"
      >
         <div
            className="bg-white max-w-screen mt-20 p-6 rounded-lg shadow-xl md:max-w-3xl w-full relative h-fit animate-fade-in transform scale-100"
            onClick={(e) => e.stopPropagation()}
         >
            {children}
         </div>
      </div>
   );
}
