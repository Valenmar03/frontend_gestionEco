import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import { Product } from "../../types";
import { getProducts } from "../../api/productAPI";
import SalesFormFields from "./SalesFormFields";

export default function SalesForm() {
   type prodArrayType = {
      product: Product;
      quantity: number;
   };
   const [prodArray, setProdArray] = useState<prodArrayType[]>([]);

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
         { product: products?.find((prod) => prod._id === id)!, quantity: 1 },
      ]);
   };

   const handleAddQty = (add: boolean, id: Product["_id"]) => {
      if (add) {
         const updatedProdArray = prodArray.map((prod) => {
            prod.product._id === id && prod.quantity++;
            return prod;
         });
         setProdArray(updatedProdArray);
         return;
      }
      if (!add) {
         const product = prodArray.find((prod) => prod.product._id === id);
         if (product?.quantity === 1) {
            setProdArray(prodArray.filter((prod) => prod.product._id !== id));
         } else {
            const updatedProdArray = prodArray.map((prod) => {
               prod.product._id === id && prod.quantity--;
               return prod;
            });
            setProdArray(updatedProdArray);
         }
         return;
      }
   };

   return (
      <>
         <form className="grid grid-cols-6  bg-white px-20 pt-5 pb-10 rounded-lg shadow-md gap-10 mt-10 w-4/5 mx-auto">
            <h2 className="text-5xl col-span-6 mx-auto font-bold text-royal-purple-500">
               Agregar Venta
            </h2>
            
            <SalesFormFields/>

            <div className=" flex flex-col col-span-3 space-y-2">
               <div className="flex justify-between">
                  <label htmlFor="products" className="text-xl">
                     Productos
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
                              className="flex justify-between first-of-type:border-t-0 border-t-2 border-gray-300 py-2 duration-200 p-3"
                              key={product._id}
                           >
                              <p className="text-center">
                                 {`${product.type} x  ${product.weight}${
                                    product.haveWeight ? "Kg." : "mL."
                                 } `}
                              </p>
                              <p className="flex items-center gap-2">
                                 <PlusIcon
                                    className="size-5 cursor-pointer"
                                    onClick={() =>
                                       handleAddQty(true, product._id)
                                    }
                                 />
                                 {quantity}
                                 <MinusIcon
                                    className="size-5 cursor-pointer"
                                    onClick={() =>
                                       handleAddQty(false, product._id)
                                    }
                                 />
                              </p>
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
         </form>
      </>
   );
}
