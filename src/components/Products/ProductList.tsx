import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/20/solid";
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
   const [search, setSearch] = useState("");

   const navigate = useNavigate();
   const location = useLocation();

   const {
      data: products,
      isError,
      isLoading,
   } = useQuery({
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
            setProductData(
               products?.find((product) => product._id === productId)
            );
         }
         if (confirmDelete) {
            setProductData(
               products?.find((product) => product._id === confirmDelete)
            );
         }
      }
   }, [productId, confirmDelete]);

   useEffect(() => {
      if (!isOpen) {
         navigate("", { replace: true });
      }
   }, [isOpen]);

   const filteredProducts = products?.filter((product) =>
      `${product.type} x ${product.weight}`
         .toLowerCase()
         .includes(search.toLowerCase())
   );

   if (isLoading) return <Spinner />;
   if (isError) return <p>Error al cargar los productos</p>;

   return (
      <>
         <div className="flex items-center mb-2 divide-x-2 divide-gray-300">
            <input type="text" className=" bg-gray-200 p-3 rounded-l-md" value={search}
               onChange={(e) => setSearch(e.target.value)}/>
            <MagnifyingGlassIcon className="size-12 text-gray-500 bg-gray-200 p-2 rounded-r-md"/>
         </div>
         <div className="w-full overflow-x-auto">
            <table className="min-w-[700px] sm:min-w-full text-lg text-left">
               <thead className="bg-gray-100 text-xl">
                  <tr>
                     <th className="px-4 py-2">Producto</th>
                     <th className="px-4 py-2">Costo</th>
                     <th className="px-4 py-2">Precio Mayorista</th>
                     <th className="px-4 py-2">Precio Minorista</th>
                     <th className="px-4 py-2">Precio ML</th>
                     <th className="px-4 py-2 text-center">Acciones</th>
                  </tr>
               </thead>
               <tbody>
                  {products ? (
                     filteredProducts!.map((product) => (
                        <ProductCard key={product._id} {...product} />
                     ))
                  ) : (
                     <p>No hay productos</p>
                  )}
               </tbody>
            </table>
         </div>
         <ModalComponent isOpen={isOpen} setIsOpen={setIsOpen}>
            {productId && (
               <>
                  <h2 className="text-3xl font-bold text-vida-loca-500">
                     Editar Producto
                  </h2>
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
