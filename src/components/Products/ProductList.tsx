import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../api/productAPI";
import { useEffect, useState } from "react";
import ModalComponent from "../ModalComponent";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useLocation, useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";

export default function ProductList() {
   const [isOpen, setIsOpen] = useState(false);

   const { data, isError, isLoading } = useQuery({
      queryKey: ["products"],
      queryFn: getProducts,
   });
   const navigate = useNavigate();
   const location = useLocation();
   const queryParams = new URLSearchParams(location.search);
   const editTask = queryParams.get("productId");
   useEffect(() => {
      if (editTask) {
         setIsOpen(true);
      }
   }, [editTask]);
   useEffect(() => {
      if (!isOpen) {
         navigate("", { replace: true });
      }
   }, [isOpen]);

   if (isLoading) return <p>Cargando...</p>;
   if (isError) return <p>Error al cargar los productos</p>;
   if (data)
      return (
         <>
            <div className="mt-10">
               <div className="grid grid-cols-4 w-full border-b-4 border-gray-300 pb-4">
                  <p className="text-2xl font-bold  text-center">Producto</p>
                  <p className="text-2xl font-bold  text-center">Cantidad</p>
                  <p className="text-2xl font-bold  text-center">Precio</p>
                  <p className="text-2xl font-bold  text-center">Editar</p>
               </div>
               {data.map((product) => (
                  <ProductCard key={product._id} {...product} />
               ))}
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
            </ModalComponent>
         </>
      );
}
