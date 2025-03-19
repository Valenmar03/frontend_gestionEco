import { CreateClientForm } from "../../types";
import { FieldErrors, UseFormRegister } from "react-hook-form";

type ClientFormsFieldsProps = {
    register: UseFormRegister<CreateClientForm>
    errors: FieldErrors<CreateClientForm>
}

export default function ClientFormsFields({ register, errors } : ClientFormsFieldsProps) {
   return (
      <>
         <div className="flex flex-col space-y-2">
            {errors.name && (
               <p className="text-red-600">{errors.name.message}</p>
            )}
            <label htmlFor="name" className="text-xl">
               Nombre
            </label>
            <input
               type="text"
               id="name"
               className={`p-3 text-xl bg-gray-100 rounded outline-flirt-600 ${
                  errors.name ? "border-l-4 border-red-600" : ""
               }`}
               placeholder="Nombre del Cliente"
               {...register("name", {
                  required: "Este campo es obligatorio",
                  minLength: {
                     value: 4,
                     message: "El nombre debe tener al menos 4 caracteres",
                   }
               })}
            />
         </div>
         <div className="flex flex-col space-y-2">
            {errors.cuil && (
               <p className="text-red-600">{errors.cuil.message}</p>
            )}
            <label htmlFor="cuil" className="text-xl">
               CUIL / CUIT
            </label>
            <input
               type="text"
               id="name"
               className={`p-3 text-xl bg-gray-100 rounded outline-flirt-600 ${
                  errors.cuil ? "border-l-4 border-red-600" : ""
               }`}
               placeholder="Numero de CUIL / CUIT del Cliente"
               {...register("cuil", {
                  required: "Este campo es obligatorio",
                  minLength: {
                     value: 10,
                     message: "El CUIL/CUIT debe tener al menos 10 caracteres",
                   }
               })}
            />
         </div>
         <div className="flex flex-col space-y-2">
            {errors.phoneNumber && (
               <p className="text-red-600">{errors.phoneNumber.message}</p>
            )}
            <label htmlFor="phoneNumber" className="text-xl">
               Telefono
            </label>
            <input
               type="text"
               id="name"
               className={`p-3 text-xl bg-gray-100 rounded outline-flirt-600 ${
                  errors.phoneNumber ? "border-l-4 border-red-600" : ""
               }`}
               placeholder="Numero de Telefono del Cliente"
               {...register("phoneNumber", {
                  required: "Este campo es obligatorio",
               })}
            />
         </div>
         <div className="flex flex-col space-y-2">
            {errors.address && (
               <p className="text-red-600">{errors.address.message}</p>
            )}
            <label htmlFor="address" className="text-xl">
               Dirección
            </label>
            <input
               type="text"
               id="name"
               className={`p-3 text-xl bg-gray-100 rounded outline-flirt-600 ${
                  errors.address ? "border-l-4 border-red-600" : ""
               }`}
               placeholder="Dirección del Cliente"
               {...register("address", {
                  required: "Este campo es obligatorio",
               })}
            />
         </div>
      </>
   );
}
