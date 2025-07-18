import { Product, SaleType } from "../../types";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../api/productAPI";
import { TrashIcon } from "@heroicons/react/20/solid";
import { formatCurrency } from "../../helpers";
import { useState } from "react";

type prodArrayType = {
   product: Product;
   quantity: number;
};

type SalesFormProdsProps = {
   prodArray: prodArrayType[];
   setProdArray: React.Dispatch<React.SetStateAction<prodArrayType[]>>;
   errors: {
      product: string;
   };
   type: SaleType;
};

export default function SalesFormProds({
   prodArray,
   setProdArray,
   errors,
   type,
}: SalesFormProdsProps) {
   const { data: products } = useQuery({
      queryKey: ["products"],
      queryFn: getProducts,
   });

   const [search, setSearch] = useState("");

   const handleAddProduct = (id: Product["_id"]) => {
      const isAlready = prodArray.find((prod) => prod.product._id === id);
      if (isAlready) {
         setProdArray(prodArray.filter((prod) => prod.product._id !== id));
         return;
      }

      const found = products?.find((prod) => prod._id === id);
      if (found) {
         setProdArray([...prodArray, { product: found, quantity: 0 }]);
      }
   };

   const handleChangeQty = (id: Product["_id"], qty: number) => {
      if (qty < 0) return;
      const updated = prodArray.map((prod) =>
         prod.product._id === id ? { ...prod, quantity: qty } : prod
      );
      setProdArray(updated);
   };

   const handleDelete = (id: Product["_id"]) => {
      setProdArray(prodArray.filter((prod) => prod.product._id !== id));
   };

   const filteredProducts = products?.filter((product) =>
      `${product.type} ${product.weight}`
         .toLowerCase()
         .includes(search.toLowerCase())
   );

   return (
      <>
         {/* Productos seleccionados */}
         <div className="flex flex-col col-span-3 space-y-3">
            <h3 className="text-xl font-semibold">Productos Seleccionados</h3>

            <div className="bg-gray-200/50 rounded-lg text-lg max-h-[250px] overflow-y-auto shadow-inner">
               {prodArray.length === 0 ? (
                  <p
                     className={`text-center p-4 text-gray-500 ${
                        errors.product && "border-l-4 border-red-500"
                     }`}
                  >
                     Aún no hay productos agregados.
                  </p>
               ) : (
                  prodArray.map(({ product, quantity }) => (
                     <div
                        key={product._id}
                        className={`grid grid-cols-8 items-center border-t border-gray-300 py-2 px-3 ${
                           errors.product && quantity === 0
                              ? "border-l-4 border-red-500"
                              : ""
                        }`}
                     >
                        <p className="col-span-3 text-center">
                           {`${product.type} x ${product.weight}${
                              product.haveWeight ? "Kg." : "mL."
                           }`}
                        </p>
                        <p className="col-span-2 text-center">
                           {formatCurrency(product.price[type])}
                        </p>
                        <input
                           type="number"
                           value={quantity}
                           onChange={(e) =>
                              handleChangeQty(
                                 product._id,
                                 Number(e.target.value)
                              )
                           }
                           className="col-span-2 text-center bg-white rounded-md p-1 border border-gray-300"
                        />
                        <TrashIcon
                           className="col-span-1 size-5 mx-auto text-red-500 hover:scale-110 transition cursor-pointer"
                           onClick={() => handleDelete(product._id)}
                        />
                     </div>
                  ))
               )}
            </div>

            {errors.product && (
               <p className="text-base text-red-500">{errors.product}</p>
            )}
         </div>

         {/* Productos disponibles */}
         <div className="flex flex-col col-span-3 space-y-3">
            <h3 className="text-xl font-semibold">Agregar Productos</h3>

            {/* Buscador */}
            <input
               type="text"
               placeholder="Buscar por tipo o peso..."
               className="p-2 rounded-md border border-gray-300 bg-white text-lg"
               value={search}
               onChange={(e) => setSearch(e.target.value)}
            />

            {/* Lista de productos */}
            <div className="bg-gray-200/50 rounded-lg text-lg max-h-[250px] overflow-y-auto shadow-inner">
               {filteredProducts?.map((product) => {
                  const isSelected = prodArray.some(
                     (p) => p.product._id === product._id
                  );

                  return (
                     <p
                        key={product._id}
                        onClick={() => handleAddProduct(product._id)}
                        className={`text-center py-2 px-3 border-t border-gray-300 cursor-pointer transition duration-200 ${
                           isSelected
                              ? "bg-vida-loca-500/60 hover:bg-vida-loca-500/80 font-medium"
                              : "hover:bg-gray-300"
                        }`}
                     >
                        {`${product.type} x ${product.weight}${
                           product.haveWeight ? "Kg." : "mL."
                        } (${product.stock})`}
                     </p>
                  );
               })}
            </div>
         </div>
      </>
   );
}
