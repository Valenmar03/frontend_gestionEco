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
         {data.map((product) => (
            <>
               <div
                  key={product._id}
                  className="bg-gray-200 p-2 rounded mt-3 grid grid-cols-4"
               >
                  <label
                     htmlFor="stock"
                     className="text-lg border-b-2 border-gray-200 col-span-3"
                  >
                     {product.type} x {product.weight}{" "}
                     {product.haveWeight ? "Kg." : "mL."}
                  </label>
                  <input
                     id="stock"
                     type="number"
                     defaultValue={0}
                     className="text-lg outline-0"
                     {...register(product._id, {
                        validate: (value) =>
                           value >= 0 || "El valor debe ser mayor a 0",
                     })}
                  />
               </div>
               {errors[product._id] && (
                  <p className="text-red-500">El stock debe ser mayor a 0</p>
               )}
            </>
         ))}
      </>
   );
}
