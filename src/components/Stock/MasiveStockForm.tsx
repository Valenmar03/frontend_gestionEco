import { FieldValues, UseFormRegister } from "react-hook-form";
import { Product } from "../../types";

type MasiveStockFormProps = {
   register: UseFormRegister<FieldValues>;
   data: Product[];
};
export default function MasiveStockForm({
   register,
   data,
}: MasiveStockFormProps) {
   return (
      <>
         {data.map((product) => (
            <div
               key={product._id}
               className="grid grid-cols-8 bg-gray-200 p-2 rounded"
            >
               <label 
                  htmlFor="stock"
                  className="text-lg col-span-6 border-b-2 border-gray-200">
                  {product.type} x {product.weight}{" "}
                  {product.haveWeight ? "Kg." : "mL."}
               </label>
               <input
                  id="stock"
                  type="number"
                  defaultValue={0}
                  className="text-lg outline-0 col-span-2"
                  {...register(product._id)}
               />
            </div>
         ))}

         <input
            type="submit"
            value="Agregar Pedido"
            className="bg-orange-500 hover:bg-orange-600  text-white w-full rounded-md p-2 text-2xl font-bold cursor-pointer duration-200"
         />
      </>
   );
}
