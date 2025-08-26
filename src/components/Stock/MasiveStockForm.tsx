import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { Product } from "../../types";

type MasiveStockFormProps = {
   register: UseFormRegister<FieldValues>;
   data: Product[];
   errors: FieldErrors<FieldValues>;
};
export default function MasiveStockForm({
   register,
   errors,
   data,
}: MasiveStockFormProps) {
   return (
      <>
         {data.map((product) => {
            const inputId = `stock-${product._id}`;
            return (
               <div key={product._id} className="flex gap-1 w-full">
                  <div className="bg-gray-100 rounded mt-3 grid grid-cols-12 w-full items-center">
                     <label
                        htmlFor={inputId}
                        className="text-lg col-span-10 border-r-2 border-gray-400 p-2 whitespace-normal break-words"
                     >
                        {product.type} x {product.weight}{" "}
                        {product.haveWeight ? "Kg." : "mL."}
                     </label>

                     <input
                        id={inputId}
                        type="number"
                        defaultValue={0}
                        className="text-lg outline-0 p-2 col-span-2 w-full min-w-0 text-center"
                        {...register(product._id, {
                           validate: (value) =>
                              value >= 0 || "El valor debe ser mayor a 0",
                        })}
                     />
                  </div>

                  {errors[product._id] && (
                     <p className="text-red-500">
                        El stock debe ser mayor o igual a 0
                     </p>
                  )}
               </div>
            );
         })}
      </>
   );
}
