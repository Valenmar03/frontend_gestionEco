import { FieldErrors, UseFormRegister } from "react-hook-form";
import { CreateProductForm } from "../../types";
import ProductFormFields from "./ProductFormFields";

type ProductFormProps = {
   errors: FieldErrors<CreateProductForm>;
   register: UseFormRegister<CreateProductForm>;
};

export default function ProductForm({ errors, register }: ProductFormProps) {
   return (
      <div className="space-y-6">
         <ProductFormFields errors={errors} register={register} />
         <input
            type="submit"
            value="Crear Producto"
            className="bg-vida-loca-600 hover:bg-vida-loca-600/80 text-white w-full rounded-md p-3 text-2xl font-bold cursor-pointer transition duration-200"
         />
      </div>
   );
}
