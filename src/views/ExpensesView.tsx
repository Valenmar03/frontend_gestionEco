import { useState } from "react";
import { pages } from "../data";
import ModalComponent from "../components/ModalComponent";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import ExpenseList from "../components/Expenses/ExpenseList";
import ExpenseForm from "../components/Expenses/ExpenseForm";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { CreateExpenseForm } from "../types";
import { createExpense } from "../api/expensesAPI";

export default function ExpensesView() {

   const page = pages.find((p) => p.title === "Gastos");
   const [isOpen, setIsOpen] = useState(false);

   const initialValues: CreateExpenseForm = {
      description: "",
      amount: 0,
      date: "",
      category: "",
      notes: ""
   };

   const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
   } = useForm({ defaultValues: initialValues });

   const queryClient = useQueryClient();

   const { mutate } = useMutation({
      mutationFn: createExpense,
      onSuccess: (data) => {
         toast.success(data);
         setIsOpen(false);
         queryClient.invalidateQueries({ queryKey: ["expenses"] });
         reset();
      },
      onError: (error: any) => {
         toast.error(error.message);
      },
   });

   const handleForm = (formData: CreateExpenseForm) => {
      mutate(formData)
   };

  return (
    <>
         <div className="relative mb-10">
            <div className="text-center">
               <h1 className="text-4xl sm:text-6xl font-bold text-caribbean-green-600">
                  {page?.title}
               </h1>
               <h2 className="text-xl sm:text-2xl mt-2 text-caribbean-green-600/80">
                  {page?.description}
               </h2>
            </div>

            <button
               onClick={() => setIsOpen(true)}
               className="absolute right-0 top-1/2 -translate-y-1/2 px-5 py-2 bg-caribbean-green-500 rounded-lg hover:bg-caribbean-green-500/80 transition duration-200"
               title="Agregar producto"
            >
               <PlusIcon className="size-10 text-white" />
            </button>
         </div>

         <ExpenseList/>

         <ModalComponent isOpen={isOpen} setIsOpen={setIsOpen}>
            <div className="relative">
               <h2 className="text-3xl font-bold text-caribbean-green-500">
                  Agregar Gasto
               </h2>
               <p className="text-caribbean-green-500/80">
                  Ingrese todos los datos necesarios para poder agregar el
                  gasto
               </p>
               <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-2 right-2 cursor-pointer"
                  title="Cerrar modal"
               >
                  <XMarkIcon className="size-6 hover:text-red-600 transition duration-200" />
               </button>

               <form
                  className="space-y-5 mt-5"
                  onSubmit={handleSubmit(handleForm)}
                  noValidate
               >
                  <ExpenseForm register={register} errors={errors} />
               </form> 
            </div>
         </ModalComponent>
      </>
  )
}
