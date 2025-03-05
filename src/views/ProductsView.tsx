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

export default function ProductsView() {
   const [isOpen, setIsOpen] = useState(false);

   const initialValues: CreateProductForm = {
      type: "",
      haveWeight: true,
      weight: 0,
      cost: 0,
      price: {
         wholesalePrice: 0,
         retailPrice: 0,
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
      onError: (error) => {
         toast.error(error.message);
      },
   });

   const handleForm = (formData: CreateProductForm) => mutate(formData);
   return (
      <>
         <div className="flex justify-between items-center">
            <div className="mx-auto">
               <h1 className="text-center text-6xl font-bold text-vida-loca-600">
                  Productos
               </h1>
               <h2 className="text-center text-2xl mt-2 text-vida-loca-600/80">
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
         <ProductList />
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

            <form
               className="space-y-5 mt-5"
               onSubmit={handleSubmit(handleForm)}
               noValidate
            >
               <ProductForm register={register} errors={errors} />
            </form>
         </ModalComponent>
      </>
   );
}
