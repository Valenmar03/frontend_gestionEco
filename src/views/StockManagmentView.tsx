import { useMemo, useState } from "react";
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
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

export default function StockManagmentView() {
   const page = pages.filter((page) => page.title === "Control de Stock")[0];
   const [isOpen, setIsOpen] = useState(false);
   const [search, setSearch] = useState("");

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

   const filteredProducts = useMemo(
      () =>
         (data ?? []).filter((p) =>
            `${p.type} x ${p.weight}`
               .toLowerCase()
               .includes(search.toLowerCase())
         ),
      [data, search]
   );

   return (
      <>
         <div className="flex flex-col md:flex-row md:justify-end items-center gap-5">
            <div className="mx-auto">
               <h1 className="text-center text-6xl font-bold text-orange-400">
                  {page.title}
               </h1>
               <h2 className="text-center text-2xl mt-2 text-orange-400/80">
                  {page.description}
               </h2>
            </div>
            <div className="">
               <button
                  onClick={() => setIsOpen(true)}
                  className={`px-6 py-2 text-2xl bg-orange-400/70 text-orange-700 font-semibold rounded-lg hover:bg-orange-400/80 cursor-pointer duration-200 ${
                     isLoading || (isError && "disabled disabled:opacity-55")
                  }`}
               >
                  Realicé un pedido
               </button>
            </div>
         </div>
         <div>
            {isLoading ? (
               <Spinner />
            ) : isError ? (
               <p>Error al cargar los productos</p>
            ) : (
               data && <StockList data={data} />
            )}
         </div>
         <ModalComponent isOpen={isOpen} setIsOpen={setIsOpen}>
            <h2 className="text-3xl font-bold text-orange-500">
               Realicé un pedido
            </h2>
            <p className="text-orange-500/80">
               Ingrese que cantidad (en unidades) de cada producto pidió
            </p>
            <div className="flex items-center mb-2 divide-x-2 divide-gray-300 mt-10">
               <input
                  type="text"
                  className=" bg-gray-200 p-3 rounded-l-md"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Busqueda por producto"
               />
               <MagnifyingGlassIcon className="size-12 text-gray-500 bg-gray-200 p-2 rounded-r-md" />
            </div>
            <form
               className=" mt-3 flex flex-col sm:grid sm:grid-cols-2 gap-3"
               onSubmit={handleSubmit(handleForm)}
               noValidate
            >
               {data && (
                  <MasiveStockForm
                     register={register}
                     data={filteredProducts!}
                     errors={errors}
                  />
               )}
               <input
                  type="submit"
                  value="Agregar Pedido"
                  className="bg-orange-500 hover:bg-orange-600 mt-3 col-span-2 text-white w-4/5 mx-auto rounded-md p-2 text-2xl font-bold cursor-pointer duration-200"
               />
            </form>
         </ModalComponent>
      </>
   );
}
