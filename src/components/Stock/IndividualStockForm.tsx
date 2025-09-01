import { useForm } from "react-hook-form";
import { Product } from "../../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addStock } from "../../api/productAPI";
import { toast } from "react-toastify";

type IndividualStockFormProps = {
   product: Product;
   setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function IndividualStockForm({
   product,
   setIsOpen,
}: IndividualStockFormProps) {
   const initalValues = {
      remainingStock: product.stock,
   };

   const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
   } = useForm({
      defaultValues: initalValues,
   });

   const queryClient = useQueryClient();

   const { mutate } = useMutation({
      mutationFn: addStock,
      onSuccess: ({ message }) => {
         toast.success(message);
         setIsOpen(false);
         queryClient.invalidateQueries({ queryKey: ["products"] });
         reset();
      },
      onError: (error) => {
         toast.error(error.message);
      },
   });

   const handleForm = (formData: { remainingStock: number }) => {
      const { remainingStock } = formData;
      mutate([{ id: product._id, stock: remainingStock - product.stock }]);
   };

   return (
      <form
         className=" mt-3"
         noValidate
         onSubmit={handleSubmit(handleForm)}
      >
         <div className="bg-gray-100 rounded mt-3 grid grid-cols-12 w-full items-center">
            <label
               htmlFor="stock"
               className="text-lg col-span-9 border-r-2 border-gray-400 p-2"
            >
               {product.type} x {product.weight}{" "}
               {product.haveWeight ? "Kg." : "mL."}
            </label>
            <input
               id="stock"
               type="number"
               className="text-lg col-span-3 p-2"
               {...register("remainingStock")}
            />
         </div>
         {errors.remainingStock && <p className="text-red-500">El stock debe ser mayor a 0</p>}
         <input
            type="submit"
            value="Actualizar Stock"
            className="bg-orange-500 hover:bg-orange-600 mt-3  text-white w-full rounded-md p-2 text-2xl font-bold cursor-pointer duration-200"
         />
      </form>
   );
}
