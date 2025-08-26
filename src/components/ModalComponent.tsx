// components/ModalComponent.tsx
import { ReactNode, useEffect } from "react";

type Props = {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  children: ReactNode;
};

export default function ModalComponent({ isOpen, setIsOpen, children }: Props) {
  useEffect(() => {
    if (isOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/50 flex items-start sm:items-center justify-center"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="relative w-[92%] sm:w-full sm:max-w-xl rounded-xl bg-white shadow-xl
                   mt-4 sm:mt-0 max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()} 
      >
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
