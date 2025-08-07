import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { PlusIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { createProduct } from "../api/productAPI";
import ModalComponent from "../components/ModalComponent";
import ProductForm from "../components/Products/ProductForm";
import { CreateProductForm } from "../types";
import ProductList from "../components/Products/ProductList";
import { pages } from "../data";

export default function ProductsView() {
   const page = pages.find((p) => p.title === "Productos");
   const [isOpen, setIsOpen] = useState(false);

   const initialValues: CreateProductForm = {
      type: "",
      haveWeight: true,
      weight: 0,
      cost: 0,
      revenuePercentage: {
         wholesale: 0,
         retail: 0,
         mercadoLibre: 0,
      },
   };

   const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
   } = useForm({ defaultValues: initialValues });

   const queryClient = useQueryClient();

   const { mutate } = useMutation({
      mutationFn: createProduct,
      onSuccess: (data) => {
         toast.success(data);
         setIsOpen(false);
         queryClient.invalidateQueries({ queryKey: ["products"] });
         reset();
      },
      onError: (error: any) => {
         toast.error(error.message);
      },
   });

   const handleForm = (formData: CreateProductForm) => {
      formData.revenuePercentage.mercadoLibre /= 100;
      formData.revenuePercentage.retail /= 100;
      formData.revenuePercentage.wholesale /= 100;
      
      mutate(formData)
   };

   return (
      <>
         <div className="relative mb-10">
            <div className="text-center">
               <h1 className="text-4xl sm:text-6xl font-bold text-vida-loca-600">
                  {page?.title}
               </h1>
               <h2 className="text-xl sm:text-2xl mt-2 text-vida-loca-600/80">
                  {page?.description}
               </h2>
            </div>

            <button
               onClick={() => setIsOpen(true)}
               className="absolute right-0 top-1/2 -translate-y-1/2 px-5 py-2 bg-vida-loca-500 rounded-lg hover:bg-vida-loca-500/80 transition duration-200"
               title="Agregar producto"
            >
               <PlusIcon className="size-10 text-white" />
            </button>
         </div>

         <ProductList />

         <ModalComponent isOpen={isOpen} setIsOpen={setIsOpen}>
            <div className="relative">
               <h2 className="text-3xl font-bold text-vida-loca-500">
                  Agregar Producto
               </h2>
               <p className="text-vida-loca-500/80">
                  Ingrese todos los datos necesarios para poder agregar el
                  producto
               </p>
               <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-2 right-2 cursor-pointer"
                  title="Cerrar modal"
               >
                  <XMarkIcon className="size-6 hover:text-red-600 transition duration-200" />
               </button>

               <form
                  className="space-y-5 mt-5"
                  onSubmit={handleSubmit(handleForm)}
                  noValidate
               >
                  <ProductForm register={register} errors={errors} />
               </form>
            </div>
         </ModalComponent>
      </>
   );
}
