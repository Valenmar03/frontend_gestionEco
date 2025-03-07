import { useState } from "react";
import ModalComponent from "../components/ModalComponent";
import StockList from "../components/Stock/StockList";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addStock, getProducts } from "../api/productAPI";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AddStockForm } from "../types";

export default function StockManagmentView() {
   const [isOpen, setIsOpen] = useState(false);

   const { data, isError, isLoading } = useQuery({
      queryKey: ["products"],
      queryFn: getProducts,
   });

   const {
         register,
         handleSubmit,
         reset,
      } = useForm();

      const queryClient = useQueryClient();

      const { mutate } = useMutation({
         mutationFn: addStock,
         onSuccess: ({message}) => {
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
         const products = Object.keys(formData).map(key => ({
            id: key,
            stock: formData[key]
         }))
         mutate(products);
      };
   
   return (
      <>
         <div className="grid grid-cols-3">
            <div className=" col-span-1 col-start-2">
               <h1 className="text-center text-6xl font-bold text-orange-400">
                  Control de Stock
               </h1>
               <h2 className="text-center text-2xl mt-2 text-orange-400/80">
                  Maneja el stock de tus productos
               </h2>
            </div>
            <div className="col-span-1 col-start-3 my-auto ml-auto">
               <button
                  onClick={() => setIsOpen(true)}
                  className="px-6 py-2 text-2xl bg-orange-400 text-white font-semibold rounded-lg hover:bg-orange-400/80 cursor-pointer duration-200"
               >
                  Realicé un pedido
               </button>
            </div>
         </div>
         <div>
            {
               isLoading && <p>Cargando...</p>
            }
            {
               isError && <p>Error al cargar los productos</p>
            }
            {
               data && <StockList data={data} />
            }
         </div>
         <ModalComponent isOpen={isOpen} setIsOpen={setIsOpen}>
            <h2 className="text-3xl font-bold ">Realicé un pedido</h2>
            <p className="mt-2 opacity-80 text-lg">
               Ingrese que cantidad (en unidades) de cada producto pidió
            </p>
            <form 
               className="space-y-3 mt-3"
               onSubmit={handleSubmit(handleForm)}
               noValidate
            >
               {
                  data && 
                  data.map((product) => (
                     <div key={product._id} className="grid grid-cols-8 bg-gray-200 p-2 rounded">
                        <p className="text-lg col-span-6 border-b-2 border-gray-200">{product.type} x {product.weight} {product.haveWeight ? "Kg." : "mL."}</p>
                        <input 
                           type="number" 
                           defaultValue={0} 
                           className="text-lg outline-0 col-span-2" 
                           {...register(product._id)}
                        />
                     </div>
                  ))
               }
               
               <input
                  type="submit"
                  value="Agregar Pedido"
                  className="bg-orange-500 hover:bg-orange-600  text-white w-full rounded-md p-2 text-2xl font-bold cursor-pointer duration-200"
               />
            </form>
         </ModalComponent>
      </>
   );
}
