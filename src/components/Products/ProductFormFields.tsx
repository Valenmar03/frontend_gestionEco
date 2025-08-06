import { FieldErrors, UseFormRegister } from "react-hook-form";
import { CreateProductForm } from "../../types";

type ProductFormProps = {
   errors: FieldErrors<CreateProductForm>;
   register: UseFormRegister<CreateProductForm>;
};

export default function ProductFormFields({
   errors,
   register,
}: ProductFormProps) {
   const priceFields = [
      { key: "wholesale", label: "Porcentaje Ganancia Mayorista" },
      { key: "retail", label: "Porcentaje Ganancia Minorista" },
      { key: "mercadoLibre", label: "Porcentaje Ganancia MercadoLibre" },
   ] as const;

   return (
      <div className="space-y-6">
         <div className="flex flex-col space-y-2">
            <label htmlFor="type" className="text-xl font-semibold">
               Tipo de Producto
            </label>
            <input
               id="type"
               type="text"
               placeholder="Ej: Insecticida"
               className={`p-3 text-xl bg-gray-100 rounded outline-vida-loca-600 ${
                  errors.type ? "border-l-4 border-red-600" : ""
               }`}
               {...register("type", { required: "Este campo es obligatorio" })}
            />
            {errors.type && (
               <p className="text-red-600 text-sm">{errors.type.message}</p>
            )}
         </div>

         <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-col space-y-2 w-full sm:w-1/2">
               <label htmlFor="weight" className="text-xl font-semibold">
                  Peso / Volumen
               </label>
               <div className="flex">
                  <input
                     type="number"
                     id="weight"
                     placeholder="Cantidad"
                     className={`p-3 text-xl w-full bg-gray-100 rounded-l outline-vida-loca-600 ${
                        errors.weight ? "border-l-4 border-red-600" : ""
                     }`}
                     {...register("weight", {
                        validate: (value) =>
                           value > 0 || "El valor debe ser mayor a 0",
                     })}
                  />
                  <select
                     className="p-3 text-xl bg-gray-100 rounded-r outline-vida-loca-600"
                     {...register("haveWeight")}
                  >
                     <option value="true">Kg.</option>
                     <option value="false">mL.</option>
                  </select>
               </div>
               {errors.weight && (
                  <p className="text-red-600 text-sm">
                     {errors.weight.message}
                  </p>
               )}
            </div>

            <div className="flex flex-col space-y-2 w-full sm:w-1/2">
               <label htmlFor="cost" className="text-xl font-semibold">
                  Costo
               </label>
               <input
                  type="number"
                  id="cost"
                  placeholder="Costo del producto"
                  className={`p-3 text-xl bg-gray-100 rounded outline-vida-loca-600 ${
                     errors.cost ? "border-l-4 border-red-600" : ""
                  }`}
                  {...register("cost", {
                     validate: (value) =>
                        value > 0 || "El valor debe ser mayor a 0",
                  })}
               />
               {errors.cost && (
                  <p className="text-red-600 text-sm">{errors.cost.message}</p>
               )}
            </div>
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {priceFields.map(({ key, label }) => (
               <div key={key} className="flex flex-col space-y-2">
                  <label htmlFor={key} className="text-xl font-semibold">
                     {label}
                  </label>
                  <input
                     type="number"
                     id={key}
                     placeholder={`Ej.: 100`}
                     className={`p-3 text-xl bg-gray-100 rounded outline-vida-loca-600 ${
                        errors.revenuePercentage?.[key]?.message
                           ? "border-l-4 border-red-600"
                           : ""
                     }`}
                     {...register(
                        `revenuePercentage.${key}` as `revenuePercentage.${typeof key}`,
                        {
                           valueAsNumber: true,
                           validate: (value: number) =>
                              value > 0 || "El valor debe ser mayor a 0",
                        }
                     )}
                  />
                  {errors.revenuePercentage?.[key] &&
                     typeof errors.revenuePercentage[key] !== "string" && (
                        <p className="text-red-600 text-sm">
                           {(errors.revenuePercentage[key] as any).message}
                        </p>
                     )}
               </div>
            ))}
         </div>
      </div>
   );
}
