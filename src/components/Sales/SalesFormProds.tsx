import { useState } from "react";
import { Product } from "../../types";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../api/productAPI";
import { TrashIcon } from "@heroicons/react/20/solid";

type prodArrayType = {
   product: Product;
   quantity: number;
};

type SalesFormProdsProps = {
   prodArray: prodArrayType[]
   setProdArray: React.Dispatch<React.SetStateAction<prodArrayType[]>>
};

export default function SalesFormProds({ prodArray, setProdArray } : SalesFormProdsProps) {
   const [error, setError] = useState("");

   const { data: products } = useQuery({
      queryKey: ["products"],
      queryFn: getProducts,
   });

   const handleAddProduct = (id: Product["_id"]) => {
      const product = prodArray.find((prod) => prod.product._id === id);
      if (product) {
         setProdArray(prodArray.filter((prod) => prod.product._id !== id));
         return;
      }

      setProdArray([
         ...prodArray,
         { product: products?.find((prod) => prod._id === id)!, quantity: 0 },
      ]);
   };

   const handleChangeQty = (id: Product["_id"], qty: number) => {
      if (qty < 0) {
         setError("La cantidad debe ser mayor a 0 (cero)");
         return;
      }
      const updatedProdArray = prodArray.map((prod) => {
         return prod.product._id === id ? { ...prod, quantity: qty } : prod;
      });
      setProdArray(updatedProdArray);
   };

   const handleDelete = (id: Product["_id"]) => {
      setProdArray(prodArray.filter((prod) => prod.product._id !== id));
   };
   return (
      <>
         <div className=" flex flex-col col-span-3 space-y-2">
            <div className="flex justify-between">
               <label
                  htmlFor="products"
                  className="text-xl flex gap-3 items-center"
               >
                  Productos
                  {error && (
                     <span className="text-base text-red-500">{error}</span>
                  )}
               </label>
            </div>

            <div className="bg-gray-200/50 rounded-lg text-lg max-h-[200px] overflow-y-scroll">
               {prodArray.length === 0 ? (
                  <>
                     <p className="text-center p-2">Aún no hay productos.</p>
                  </>
               ) : (
                  prodArray.map((prod) => {
                     const { product, quantity } = prod;
                     return (
                        <div
                           className="grid grid-cols-6 items-center first-of-type:border-t-0 border-t-2 border-gray-300 py-2 duration-200 p-3"
                           key={product._id}
                        >
                           <p className="text-center col-span-4">
                              {`${product.type} x  ${product.weight}${
                                 product.haveWeight ? "Kg." : "mL."
                              } `}
                           </p>
                           <input
                              type="number"
                              value={quantity}
                              onChange={(e) =>
                                 handleChangeQty(
                                    prod.product._id,
                                    Number(e.target.value)
                                 )
                              }
                              className="col-span-1 text-center bg-white rounded-md"
                           />

                           <TrashIcon
                              className="size-5 cursor-pointer col-span-1 mx-auto text-red-500 hover:scale-110 duration-150"
                              onClick={() => handleDelete(product._id)}
                           />
                        </div>
                     );
                  })
               )}
            </div>
         </div>
         <div className=" flex flex-col col-span-3 space-y-2 ">
            <div className="flex justify-between">
               <label htmlFor="products" className="text-xl">
                  Agregar Productos
               </label>
            </div>
            <div className="bg-gray-200/50  rounded-lg text-lg max-h-[200px] overflow-y-auto">
               {products?.map((product) => (
                  <p
                     className={`text-center first-of-type:border-t-0 border-t-2 border-gray-300 py-2 hover:bg-gray-200 cursor-pointer duration-200 ${
                        prodArray.find(
                           (prod) => prod.product._id === product._id
                        )
                           ? "bg-vida-loca-500/60 hover:bg-vida-loca-500/80"
                           : "hover:bg-gray-200"
                     }`}
                     key={product._id}
                     onClick={() => handleAddProduct(product._id)}
                  >
                     {`${product.type} x  ${product.weight}${
                        product.haveWeight ? "Kg." : "mL."
                     } `}
                  </p>
               ))}
            </div>
         </div>
      </>
   );
}
