import { useForm } from "react-hook-form";
export default function ProductForm() {
   const initialValues = {
      type: "",
      haveWeight: true,
      weight: 0, 
      cost: 0,
      price: {
         wholesalePrice: 0,
         retailPrice: 0,
      },
   };

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({ defaultValues: initialValues });

   const handleForm = (formData: any) => {
      console.log(formData);
   };

   return (
      <form
         className="space-y-5 mt-5"
         onSubmit={handleSubmit(handleForm)}
         noValidate
      >
         {errors && (
            <p className="text-red-600 text-lg">
               Todos los campos son obligatorios
            </p>
         )}
         <div className="flex flex-col space-y-2">
            <label htmlFor="name" className="text-xl">
               Tipo de Producto
            </label>
            <input
               type="text"
               id="name"
               className={`p-3 text-xl bg-gray-100 rounded outline-vida-loca-600 ${errors.type ? "border-l-4 border-red-600" : ""}`}

               placeholder="Tipo de Producto. Ej.: Insecticida"
               {
                  ...register("type", {
                     required: "Este campo es obligatorio",
                  })
               }
            />
         </div>

         <div className="flex flex-col  space-y-2">
            <label htmlFor="cost" className="text-xl">
               Peso/Volumen
            </label>
            <div className="flex w-full">
               <input
                  type="number"
                  id="cost"
                  className={`p-3 text-xl w-full bg-gray-100 rounded outline-vida-loca-600 ${errors.weight ? "border-l-4 border-red-600" : ""}`}
                  placeholder="Peso o Volumen"
                  {
                     ...register("weight", {
                        validate: (value) => value > 0 || "El valor debe ser mayor a 0",
                     })
                  }
               />
               <select
                  id=""
                  className="p-3 text-xl bg-gray-100 rounded-r outline-vida-loca-600"
               >
                  <option value="true">Kg.</option>
                  <option value="">mL.</option>
               </select>
            </div>
         </div>

         <div className="flex flex-col space-y-2">
            <label htmlFor="cost" className="text-xl">
               Costo
            </label>
            <input
               type="number"
               id="cost"
               className={`p-3 text-xl bg-gray-100 rounded outline-vida-loca-600 ${errors.cost ? "border-l-4 border-red-600" : ""}`}

               placeholder="Costo del Producto"
               {
                  ...register("cost", {
                     validate: (value) => value > 0 || "El valor debe ser mayor a 0",
                  })
               }
            />
            
         </div>

         <div className="flex flex-col  space-y-2">
            <label htmlFor="wholesalePrice" className="text-xl">
               Precio Mayorista
            </label>
            <input
               type="number"
               id="wholesalePrice"
               className={`p-3 text-xl bg-gray-100 rounded outline-vida-loca-600 ${errors.price?.wholesalePrice ? "border-l-4 border-red-600" : ""}`}

               placeholder="Precio de Venta Mayorista"
               {
                  ...register("price.wholesalePrice", {
                     validate: (value) => value > 0 || "El valor debe ser mayor a 0",
                  })
               }
            />
         </div>

         <div className="flex flex-col  space-y-2">
            <label htmlFor="retailPrice" className="text-xl">
               Precio Minorista
            </label>
            <input
               type="number"
               id="retailPrice"
               className={`p-3 text-xl bg-gray-100 rounded outline-vida-loca-600 ${errors.price?.retailPrice ? "border-l-4 border-red-600" : ""}`}
               placeholder="Precio de Venta Minorista"
               {
                  ...register("price.retailPrice", {
                     validate: (value) => value > 0 || "El valor debe ser mayor a 0",
                  })
               }
            />
         </div>
         <input
            type="submit"
            value="Crear Producto"
            className="bg-vida-loca-600 hover:bg-vida-loca-600  text-white w-full rounded-md p-2 text-2xl font-bold cursor-pointer duration-200"
         />
      </form>
   );
}
