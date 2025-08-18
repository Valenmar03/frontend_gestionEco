import { useForm } from "react-hook-form"
import { CreateExpenseForm, Expense } from "../../types"
import ExpenseFormFields from "./ExpenseFormFields"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { updateExpense } from "../../api/expensesAPI"


type UpdateExpenseFormProps = {
  expense: Expense
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function UpdateExpenseForm({expense, setIsOpen} : UpdateExpenseFormProps) {

  const initialValues : CreateExpenseForm = {
    ...expense
  }

  const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
     } = useForm({ defaultValues: initialValues }); 

     const queryClient = useQueryClient();
   const { mutate } = useMutation({
      mutationFn: updateExpense,
      onSuccess: (data) => {
         toast.success(data.message);
         setIsOpen(false);
         queryClient.invalidateQueries({ queryKey: ["expenses"] });
         reset();
      },
      onError: (error) => {
         toast.error(error.message);
         console.log(error);
      },
   });

   const handleForm = (formData: CreateExpenseForm) => {
    mutate({id: expense._id, formData})
   }

  return (
    <form
      className="space-y-5 mt-5"
      onSubmit={handleSubmit(handleForm)}
      noValidate
    >
      <ExpenseFormFields errors={errors} register={register} />

      <input
          type="submit"
          value="Actualizar Gasto"
          className="bg-caribbean-green-600 hover:bg-caribbean-green-600  text-white w-full rounded-md p-2 text-2xl font-bold cursor-pointer duration-200"
      />
    </form>
  )
}
