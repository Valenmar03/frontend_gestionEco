
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
   return (
      <div
         className="flex justify-center items-center min-h-screen"
         onClick={() => setIsOpen(false)}
      >
         {isOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
               <div
                  className="bg-white p-6 rounded-lg shadow-xl max-w-3xl w-full transform scale-95 opacity-100 animate-fade-in relative"
                  onClick={(e) => e.stopPropagation()}
               >
                  {children}
               </div>
            </div>
         )}
      </div>
   );
}
