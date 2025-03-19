import { useForm } from "react-hook-form";
import ClientFormsFields from "./ClientFormsFields";
import { Client, CreateClientForm } from "../../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateClient } from "../../api/clientAPI";
import { toast } from "react-toastify";

type UpdateClientFormProps = {
   client: Client;
   setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function UpdateClientForm({
   client,
   setIsOpen,
}: UpdateClientFormProps) {
   const initialValues: CreateClientForm = client;

   const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
   } = useForm({ defaultValues: initialValues });
   const queryClient = useQueryClient();
   const { mutate } = useMutation({
      mutationFn: updateClient,
      onSuccess: (data) => {
         toast.success(data.message);
         setIsOpen(false);
         queryClient.invalidateQueries({ queryKey: ["clients"] });
         reset();
      },
      onError: (error) => {
         toast.error(error.message);
      },
   });

   const handleForm = (formData: CreateClientForm) => {
      mutate({
         id: client._id,
         formData,
      });
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
            value="Actualizar Cliente"
            className="bg-flirt-600 hover:bg-flirt-600/80  text-white w-full rounded-md p-2 text-2xl font-bold cursor-pointer duration-200"
         />
      </form>
   );
}
