import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteClient } from "../../api/clientAPI"
import { Client } from "../../types"
import { toast } from "react-toastify"
import { XMarkIcon } from "@heroicons/react/20/solid"

type DeleteClientModalProps = {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    client: Client
}

export default function DeleteClientModal({client, setIsOpen} : DeleteClientModalProps) {

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: deleteClient,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["clients"] });
            setIsOpen(false);
            toast.success(data.message)
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const handleDelete = () => {
        mutate({id: client._id})
    }
  return (
    <>
      <h2 className="text-3xl font-bold ">Eliminar Producto</h2>
         <p className="mt-2 text-xl opacity-80">
            ¿Está seguro que desea eliminar{" "}
            <span className="font-semibold">
               {`${client?.name}`}
            </span>
            ?
         </p>
         <button
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2"
         >
            <XMarkIcon className="size-6 cursor-pointer hover:text-red-600 duration-200" />
         </button>
         <div className="flex gap-4 mt-4">
            <button
               className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md cursor-pointer text-lg duration-200"
               onClick={() => {
                  setIsOpen(false);
                  handleDelete()
               }}
            >
               Eliminar
            </button>
            <button
               className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-md cursor-pointer text-lg duration-200"
               onClick={() => setIsOpen(false)}
            >
               Cancelar
            </button>
         </div>
    </>
  )
}
