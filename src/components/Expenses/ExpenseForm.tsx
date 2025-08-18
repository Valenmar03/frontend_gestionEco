import { FieldErrors, UseFormRegister } from "react-hook-form";
import { CreateExpenseForm } from "../../types";
import ExpenseFormFields from "./ExpenseFormFields";

type ExpenseFormProps = {
   errors: FieldErrors<CreateExpenseForm>;
   register: UseFormRegister<CreateExpenseForm>;
};


export default function ExpenseForm({ errors, register }: ExpenseFormProps) {
  return (
        <div className="space-y-6">
           <ExpenseFormFields errors={errors} register={register} />
           <input
              type="submit"
              value="Añadir Gasto"
              className="bg-caribbean-green-600 hover:bg-caribbean-green-600/80 text-white w-full rounded-md p-3 text-2xl font-bold cursor-pointer transition duration-200"
           />
        </div>
     );
}
