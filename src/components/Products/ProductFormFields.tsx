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
   return (
      <>
         <div className="flex flex-col space-y-2">
            
            <label htmlFor="name" className="text-xl">
               Tipo de Producto
            </label>
            <input
               type="text"
               id="name"
               className={`p-3 text-xl bg-gray-100 rounded outline-vida-loca-600 ${
                  errors.type ? "border-l-4 border-red-600" : ""
               }`}
               placeholder="Tipo de Producto. Ej.: Insecticida"
               {...register("type", {
                  required: "Este campo es obligatorio",
               })}
            />
            {errors.type && (
               <p className="text-red-600">{errors.type.message}</p>
            )}
         </div>
         <div className="flex space-x-2">
            <div className="flex flex-col space-y-2 w-1/2">
               
               <label htmlFor="cost" className="text-xl">
                  Peso/Volumen
               </label>
               <div className="flex w-full">
                  <input
                     type="number"
                     id="cost"
                     className={`p-3 text-xl w-full bg-gray-100 rounded outline-vida-loca-600 ${
                        errors.weight ? "border-l-4 border-red-600" : ""
                     }`}
                     placeholder="Peso o Volumen"
                     {...register("weight", {
                        validate: (value) =>
                           value > 0 || "El valor debe ser mayor a 0",
                     })}
                  />
                  <select
                     id=""
                     className="p-3 text-xl bg-gray-100 rounded-r outline-vida-loca-600"
                     {...register("haveWeight")}
                  >
                     <option value="true">Kg.</option>
                     <option value="false">mL.</option>
                  </select>
               </div>
               {errors.weight && (
                  <p className="text-red-600">{errors.weight.message}</p>
               )}
            </div>

            <div className="flex flex-col space-y-2 w-1/2">
               
               <label htmlFor="cost" className="text-xl">
                  Costo
               </label>
               <input
                  type="number"
                  id="cost"
                  className={`p-3 text-xl bg-gray-100 rounded outline-vida-loca-600 ${
                     errors.cost ? "border-l-4 border-red-600" : ""
                  }`}
                  placeholder="Costo del Producto"
                  {...register("cost", {
                     validate: (value) =>
                        value > 0 || "El valor debe ser mayor a 0",
                  })}
               />
               {errors.cost && (
                  <p className="text-red-600">{errors.cost.message}</p>
               )}
            </div>
         </div>

         <div className="flex space-x-2">
            <div className="flex flex-col  space-y-2 w-1/3">
               
               <label htmlFor="wholesalePrice" className="text-xl">
                  Precio Mayorista
               </label>
               <input
                  type="number"
                  id="wholesalePrice"
                  className={`p-3 text-xl bg-gray-100 rounded outline-vida-loca-600 ${
                     errors.price?.wholesalePrice
                        ? "border-l-4 border-red-600"
                        : ""
                  }`}
                  placeholder="Precio de Venta Mayorista"
                  {...register("price.wholesalePrice", {
                     validate: (value) =>
                        value > 0 || "El valor debe ser mayor a 0",
                  })}
               />
               {errors.price?.wholesalePrice && (
                  <p className="text-red-600">
                     {errors.price.wholesalePrice.message}
                  </p>
               )}
            </div>

            <div className="flex flex-col space-y-2 w-1/3">
               
               <label htmlFor="retailPrice" className="text-xl">
                  Precio Minorista
               </label>
               <input
                  type="number"
                  id="retailPrice"
                  className={`p-3 text-xl bg-gray-100 rounded outline-vida-loca-600 ${
                     errors.price?.retailPrice
                        ? "border-l-4 border-red-600"
                        : ""
                  }`}
                  placeholder="Precio de Venta Minorista"
                  {...register("price.retailPrice", {
                     validate: (value) =>
                        value > 0 || "El valor debe ser mayor a 0",
                  })}
               />
               {errors.price?.retailPrice && (
                  <p className="text-red-600">
                     {errors.price.retailPrice.message}
                  </p>
               )}
            </div>
            <div className="flex flex-col space-y-2 w-1/3">
               <label htmlFor="retailPrice" className="text-xl">
                  Precio MercadoLibre
               </label>
               <input
                  type="number"
                  id="retailPrice"
                  className={`p-3 text-xl bg-gray-100 rounded outline-vida-loca-600 ${
                     errors.price?.mercadoLibrePrice
                        ? "border-l-4 border-red-600"
                        : ""
                  }`}
                  placeholder="Precio de Venta ML"
                  {...register("price.mercadoLibrePrice", {
                     validate: (value) =>
                        value > 0 || "El valor debe ser mayor a 0",
                  })}
               />
               {errors.price?.mercadoLibrePrice && (
                  <p className="text-red-600">
                     {errors.price.mercadoLibrePrice.message}
                  </p>
               )}
            </div>
         </div>
      </>
   );
}
