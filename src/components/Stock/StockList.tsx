import { useLocation, useNavigate } from "react-router-dom";
import { Product } from "../../types";
import ModalComponent from "../ModalComponent";
import StockCard from "./StockCard";
import { useEffect, useMemo, useState } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/20/solid";
import IndividualStockForm from "./IndividualStockForm";

export default function StockList({ data }: { data: Product[] }) {
   const [isOpen, setIsOpen] = useState(false);
   const [productData, setProductData] = useState<Product>();
   const [search, setSearch] = useState("");

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
         <div className="flex items-center mb-2 divide-x-2 divide-gray-300 mt-10 justify-end">
            <input
               type="text"
               className=" bg-gray-200 p-3 rounded-l-md"
               value={search}
               onChange={(e) => setSearch(e.target.value)}
               placeholder="Busqueda por producto"
            />
            <MagnifyingGlassIcon className="size-12 text-gray-500 bg-gray-200 p-2 rounded-r-md" />
         </div>
         <div className="w-full overflow-x-auto">
            <table className="min-w-[700px] sm:min-w-full text-lg text-left">
               <thead className="bg-gray-100 text-xl">
                  <tr>
                     <th className="px-4 py-2">Producto</th>
                     <th className="px-4 py-2">Stock</th>
                     <th className="px-4 py-2">Estado</th>
                     <th className="px-4 py-2">Acciones</th>
                  </tr>
               </thead>
               <tbody>
                  {data ? (
                     filteredProducts!.map((product) => (
                        <StockCard key={product._id} {...product} />
                     ))
                  ) : (
                     <p>No hay productos</p>
                  )}
               </tbody>
            </table>
         </div>
         <ModalComponent isOpen={isOpen} setIsOpen={setIsOpen}>
            <h2 className="text-3xl font-bold text-orange-500">
               Editar Producto
            </h2>
            <p className="text-orange-500/80">
               Ingrese el stock que quedará del producto
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
