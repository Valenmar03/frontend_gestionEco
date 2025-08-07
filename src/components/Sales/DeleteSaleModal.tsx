import { XMarkIcon } from "@heroicons/react/24/solid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Sale } from "../../types";
import { deleteSale } from "../../api/SalesAPI";
import { useNavigate } from "react-router-dom";

type DeleteSaleModalProps = {
   sale: Sale;
   setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function DeleteSaleModal({
   sale,
   setIsOpen,
}: DeleteSaleModalProps) {
   const queryClient = useQueryClient();
   const navigate = useNavigate();

   const { mutate } = useMutation({
      mutationFn: deleteSale,
      onSuccess: (data) => {
         queryClient.invalidateQueries({ queryKey: ["sales"] });
         setIsOpen(false);
         toast.success(data.message);
         navigate("/sales")
      },
      onError: (error) => {
         toast.error(error.message);
      },
   });

   const handleDelete = () => {
      mutate({ id: sale._id });
   };

   return (
      <>
         <h2 className="text-3xl font-bold ">Eliminar Venta</h2>
         <button
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2"
         >
            <XMarkIcon className="size-6 cursor-pointer hover:text-red-600 duration-200" />
         </button>
         <div className="flex gap-4 mt-4">
            <button
               className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md cursor-pointer text-lg duration-200"
               onClick={() => {
                  setIsOpen(false);
                  handleDelete();
               }}
            >
               Eliminar
            </button>
            <button
               className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-md cursor-pointer text-lg duration-200"
               onClick={() => setIsOpen(false)}
            >
               Cancelar
            </button>
         </div>
      </>
   );
}
