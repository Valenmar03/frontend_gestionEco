
import { useLocation, useNavigate } from "react-router-dom";
import { Product } from "../../types";
import ModalComponent from "../ModalComponent";
import StockCard from "./StockCard";
import { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import IndividualStockForm from "./IndividualStockForm";

export default function StockList({data} : {data: Product[]}) {
   
   const [isOpen, setIsOpen] = useState(false);
   const [productData, setProductData] = useState<Product>();

   const navigate = useNavigate();
   const location = useLocation();
   const queryParams = new URLSearchParams(location.search);
   const taskId = queryParams.get("productId");

   useEffect(() => {
      if (taskId) {
         setIsOpen(true);
         setProductData(data?.find((product) => product._id === taskId));
      }
   }, [taskId]);
   useEffect(() => {
      if (!isOpen) {
         navigate("", { replace: true });
      }
   }, [isOpen]);


   return (
      <>
         <div className="mt-10">
            <div className="grid grid-cols-4 w-full border-b-4 border-gray-300 pb-4">
               <p className="text-2xl font-bold  text-center">Producto</p>
               <p className="text-2xl font-bold  text-center">Stock</p>
               <p className="text-2xl font-bold  text-center">Estado</p>
            </div>
            {data ? (
               data.map((product) => (
                  <StockCard key={product._id} {...product} />
               ))
            ) : (
               <p>No hay productos</p>
            )}
         </div>
         <ModalComponent isOpen={isOpen} setIsOpen={setIsOpen}>
            <h2 className="text-3xl font-bold ">Editar Producto</h2>
            <p className="mt-2 opacity-80">
               Ingrese todos los datos necesarios para editar el producto
            </p>
            <button
               onClick={() => setIsOpen(false)}
               className="absolute top-2 right-2"
            >
               <XMarkIcon className="size-6 cursor-pointer hover:text-red-600 duration-200" />
            </button>
            <IndividualStockForm setIsOpen={setIsOpen} product={productData!} />
         </ModalComponent>
      </>
   );
}
