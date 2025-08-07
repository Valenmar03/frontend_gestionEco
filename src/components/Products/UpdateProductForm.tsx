import { useForm } from "react-hook-form";
import { CreateProductForm, Product } from "../../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProduct } from "../../api/productAPI";
import { toast } from "react-toastify";
import ProductFormFields from "./ProductFormFields";

type UpdateProductFormProps = {
   product: Product;
   setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function UpdateProductForm({
   product,
   setIsOpen,
}: UpdateProductFormProps) {
   const initialValues: CreateProductForm = {
      ...product,
      revenuePercentage: { ...product.revenuePercentage },
   };
   initialValues.revenuePercentage.mercadoLibre *= 100;
   initialValues.revenuePercentage.retail *= 100;
   initialValues.revenuePercentage.wholesale *= 100;

   const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
   } = useForm({ defaultValues: initialValues });

   const queryClient = useQueryClient();
   const { mutate } = useMutation({
      mutationFn: updateProduct,
      onSuccess: (data) => {
         toast.success(data.message);
         setIsOpen(false);
         queryClient.invalidateQueries({ queryKey: ["products"] });
         reset();
      },
      onError: (error) => {
         toast.error(error.message);
         console.log(error);
      },
   });

   const handleForm = (formData: CreateProductForm) => {
      formData.revenuePercentage.mercadoLibre /= 100;
      formData.revenuePercentage.retail /= 100;
      formData.revenuePercentage.wholesale /= 100;
      mutate({
         id: product._id,
         formData,
      });
   };
   return (
      <>
         <form
            className="space-y-5 mt-5"
            onSubmit={handleSubmit(handleForm)}
            noValidate
         >
            <ProductFormFields errors={errors} register={register} />

            <input
               type="submit"
               value="Actualizar Producto"
               className="bg-vida-loca-600 hover:bg-vida-loca-600  text-white w-full rounded-md p-2 text-2xl font-bold cursor-pointer duration-200"
            />
         </form>
      </>
   );
}
