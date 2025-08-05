import { useNavigate } from "react-router-dom";
import { Client } from "../../types";
import { TrashIcon } from "@heroicons/react/20/solid";

type ClientCardProps = {
   client: Client;
};
export default function ClientCard({ client }: ClientCardProps) {
   const navigate = useNavigate();

   return (
      <tr className="border-b border-gray-300">
         <td className="px-4 py-3  whitespace-nowrap">{client.name}</td>
         <td className="px-4 py-3  whitespace-nowrap">{client.phoneNumber}</td>
         <td className="px-4 py-3  whitespace-nowrap">{client.address}</td>
         <td className="px-4 py-3  whitespace-nowrap">{client.cuil}</td>
         <td className="px-4 py-3  whitespace-nowrap">{client.cp}</td>
         <td className="px-4 py-3  whitespace-nowrap">{client.province}</td>
         <td className="px-4 py-3  whitespace-nowrap">{client.city}</td>
         <td className="px-4 py-3">
            <div className="flex justify-between gap-2 items-center">
               <button
                  className=" text-flirt-950 text-lg font-semibold mx-auto bg-flirt-500 p-2 rounded-md w-full cursor-pointer hover:scale-105 duration-200"
                  onClick={() => {
                     navigate(location.pathname + `?clientId=${client._id}`);
                  }}
               >
                  Editar
               </button>
               <TrashIcon
                  className="size-12 text-red-500 cursor-pointer hover:scale-110 duration-200"
                  onClick={() => {
                     navigate(
                        location.pathname + `?confirmDelete=${client._id}`
                     );
                  }}
               />
            </div>
         </td>
      </tr>
   );
}
