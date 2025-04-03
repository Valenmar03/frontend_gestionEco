import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import ModalComponent from "../ModalComponent";
import { getProducts } from "../../api/productAPI";
import ProductCard from "./ProductCard";
import UpdateProductForm from "./UpdateProductForm";
import { Product } from "../../types";
import Spinner from "../Spinner";
import DeleteProductModal from "./DeleteProductModal";

export default function ProductList() {
   const [isOpen, setIsOpen] = useState(false);
   const [productData, setProductData] = useState<Product>();

   const navigate = useNavigate();
   const location = useLocation();

   const { data, isError, isLoading } = useQuery({
      queryKey: ["products"],
      queryFn: getProducts,
   });

   const queryParams = new URLSearchParams(location.search);
   const productId = queryParams.get("productId");
   const confirmDelete = queryParams.get("confirmDelete");
   useEffect(() => {
      if (productId || confirmDelete) {
         setIsOpen(true);
         if (productId) {
            setProductData(data?.find((product) => product._id === productId));
         }
         if (confirmDelete) {
            setProductData(
               data?.find((product) => product._id === confirmDelete)
            );
         }
      }
   }, [productId, confirmDelete]);

   useEffect(() => {
      if (!isOpen) {
         navigate("", { replace: true });
      }
   }, [isOpen]);

   if (isLoading) return <Spinner />;
   if (isError) return <p>Error al cargar los productos</p>;
   return (
      <>
         <div className="mt-10">
            <div className="grid grid-cols-6 w-full border-b-4 border-gray-300 pb-4">
               <p className="text-2xl font-bold  text-center">Producto</p>
               <p className="text-2xl font-bold  text-center">Costo</p>
               <p className="text-2xl font-bold  text-center">
                  Precio Mayorista
               </p>
               <p className="text-2xl font-bold  text-center">
                  Precio Minorista
               </p>
               <p className="text-2xl font-bold  text-center">
                  Precio ML
               </p>
            </div>
            {data ? (
               data.map((product) => (
                  <ProductCard key={product._id} {...product} />
               ))
            ) : (
               <p>No hay productos</p>
            )}
         </div>

         <ModalComponent isOpen={isOpen} setIsOpen={setIsOpen}>
            {productId && (
               <>
                  <h2 className="text-3xl font-bold text-vida-loca-500">Editar Producto</h2>
                  <p className="text-vida-loca-500/80">
                     Ingrese todos los datos necesarios para editar el producto
                  </p>
                  <button
                     onClick={() => setIsOpen(false)}
                     className="absolute top-2 right-2"
                  >
                     <XMarkIcon className="size-6 cursor-pointer hover:text-red-600 duration-200" />
                  </button>
                  <UpdateProductForm
                     product={productData!}
                     setIsOpen={setIsOpen}
                  />
               </>
            )}
            {confirmDelete && (
               <>
                  <DeleteProductModal
                     product={productData!}
                     setIsOpen={setIsOpen}
                  />
               </>
            )}
         </ModalComponent>
      </>
   );
}
