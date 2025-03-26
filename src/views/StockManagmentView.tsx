import { useState } from "react";
import ModalComponent from "../components/ModalComponent";
import StockList from "../components/Stock/StockList";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addStock, getProducts } from "../api/productAPI";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AddStockForm } from "../types";
import MasiveStockForm from "../components/Stock/MasiveStockForm";
import Spinner from "../components/Spinner";
import { pages } from "../data";

export default function StockManagmentView() {
   const page = pages.filter((page) => page.title === "Control de Stock")[0];
   const [isOpen, setIsOpen] = useState(false);

   const { data, isError, isLoading } = useQuery({
      queryKey: ["products"],
      queryFn: getProducts,
   });

   const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
   } = useForm();

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

   const handleForm = (formData: AddStockForm) => {
      const products = Object.keys(formData).map((key) => ({
         id: key,
         stock: formData[key],
      }));
      mutate(products);
   };

   return (
      <>
         <div className="grid grid-cols-3">
            <div className=" col-span-1 col-start-2">
            <h1 className="text-center text-6xl font-bold text-orange-400">
                  {page.title}
               </h1>
               <h2 className="text-center text-2xl mt-2 text-orange-400/80">
                  {page.description}
               </h2>
            </div>
            <div className="col-span-1 col-start-3 my-auto ml-auto">
               <button
                  onClick={() => setIsOpen(true)}
                  className={`px-6 py-2 text-2xl bg-orange-400 text-white font-semibold rounded-lg hover:bg-orange-400/80 cursor-pointer duration-200 ${
                     isLoading || (isError && "disabled disabled:opacity-55")
                  }`}
               >
                  Realicé un pedido
               </button>
            </div>
         </div>
         <div>{isLoading ? <Spinner/> : (isError ? <p>Error al cargar los productos</p> : (data && <StockList data={data} />))}</div>
         <ModalComponent isOpen={isOpen} setIsOpen={setIsOpen}>
            <h2 className="text-3xl font-bold text-orange-500">Realicé un pedido</h2>
            <p className="text-orange-500/80">
               Ingrese que cantidad (en unidades) de cada producto pidió
            </p>
            <form
               className=" mt-3"
               onSubmit={handleSubmit(handleForm)}
               noValidate
            >
               {data && (
                  <MasiveStockForm
                     register={register}
                     data={data}
                     errors={errors}
                  />
               )}
            </form>
         </ModalComponent>
      </>
   );
}
