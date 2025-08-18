import { FieldErrors, UseFormRegister } from "react-hook-form";
import { CreateExpenseForm } from "../../types";

type ExpenseFormProps = {
   errors: FieldErrors<CreateExpenseForm>;
   register: UseFormRegister<CreateExpenseForm>;
};

export default function ExpenseFormFields({
   errors,
   register,
}: ExpenseFormProps) {
   return (
      <div className="space-y-6">
         {/* Descripción */}
         <div className="flex flex-col space-y-2">
            <label htmlFor="description" className="text-xl font-semibold">
               Descripción
            </label>
            <input
               id="description"
               type="text"
               placeholder="Ej: Combustible, viáticos, mantenimiento…"
               className={`p-3 text-xl bg-gray-100 rounded outline-vida-loca-600 ${
                  errors.description ? "border-l-4 border-red-600" : ""
               }`}
               {...register("description", {
                  required: "Este campo es obligatorio",
                  minLength: {
                     value: 3,
                     message: "Debe tener al menos 3 caracteres",
                  },
               })}
            />
            {errors.description && (
               <p className="text-red-600 text-sm">
                  {errors.description.message}
               </p>
            )}
         </div>

         {/* Monto y Fecha */}
         <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-col space-y-2 w-full sm:w-1/2">
               <label htmlFor="amount" className="text-xl font-semibold">
                  Monto
               </label>
               <input
                  id="amount"
                  type="number"
                  placeholder="Ej: 12500"
                  className={`p-3 text-xl bg-gray-100 rounded outline-vida-loca-600 ${
                     errors.amount ? "border-l-4 border-red-600" : ""
                  }`}
                  {...register("amount", {
                     valueAsNumber: true,
                     validate: (v) =>
                        v > 0 ? true : "El monto debe ser mayor a 0",
                  })}
               />
               {errors.amount && (
                  <p className="text-red-600 text-sm">
                     {errors.amount.message as string}
                  </p>
               )}
            </div>

            <div className="flex flex-col space-y-2 w-full sm:w-1/2">
               <label htmlFor="date" className="text-xl font-semibold">
                  Fecha
               </label>
               <input
                  id="date"
                  type="date"
                  className={`p-3 text-xl bg-gray-100 rounded outline-vida-loca-600 ${
                     errors.date ? "border-l-4 border-red-600" : ""
                  }`}
                  {...register("date", {
                     required: "La fecha es obligatoria",
                  })}
               />
               {errors.date && (
                  <p className="text-red-600 text-sm">{errors.date.message}</p>
               )}
            </div>
         </div>

         {/* Categoría y Notas */}
         <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-col space-y-2 w-full sm:w-1/2">
               <label htmlFor="category" className="text-xl font-semibold">
                  Categoría
               </label>
               <input
                  id="category"
                  type="text"
                  placeholder="Ej: Transporte, Servicios, Insumos…"
                  className={`p-3 text-xl bg-gray-100 rounded outline-vida-loca-600 ${
                     errors.category ? "border-l-4 border-red-600" : ""
                  }`}
                  {...register("category", {
                     required: "La categoría es obligatoria",
                  })}
               />
               {errors.category && (
                  <p className="text-red-600 text-sm">
                     {errors.category.message}
                  </p>
               )}
            </div>

            <div className="flex flex-col space-y-2 w-full sm:w-1/2">
               <label htmlFor="notes" className="text-xl font-semibold">
                  Notas
               </label>
               <textarea
                  id="notes"
                  rows={3}
                  placeholder="Detalles adicionales (opcional)"
                  className={`p-3 text-xl bg-gray-100 rounded outline-vida-loca-600 ${
                     errors.notes ? "border-l-4 border-red-600" : ""
                  }`}
                  {...register("notes")}
               />
               {errors.notes && (
                  <p className="text-red-600 text-sm">{errors.notes.message}</p>
               )}
            </div>
         </div>
      </div>
   );
}
