import { useForm } from "react-hook-form";
import { CreateClientForm } from "../../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createClient } from "../../api/clientAPI";
import ClientFormsFields from "./ClientFormsFields";

type ClientFormProps = {
   setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function ClientForm({ setIsOpen }: ClientFormProps) {
   const initalValues: CreateClientForm = {
      name: "",
      phoneNumber: "",
      address: "",
      cuil: "",
   };

   const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
   } = useForm({ defaultValues: initalValues });

   const queryClient = useQueryClient();

   const { mutate } = useMutation({
      mutationFn: createClient,
      onSuccess: (data) => {
         toast.success(data);
         setIsOpen(false);
         queryClient.invalidateQueries({ queryKey: ["clients"] });
         reset();
      },
      onError: (error) => {
         toast.error(error.message);
      },
   });

   const handleForm = (formData: CreateClientForm) => {
      mutate(formData);
   };

   return (
      <form
         className="space-y-5 mt-5"
         onSubmit={handleSubmit(handleForm)}
         noValidate
      >
         <ClientFormsFields register={register} errors={errors} />
         <input
            type="submit"
            value="Añadir Cliente"
            className="bg-flirt-600 hover:bg-flirt-600/80  text-white w-full rounded-md p-2 text-2xl font-bold cursor-pointer duration-200"
         />
      </form>
   );
}
