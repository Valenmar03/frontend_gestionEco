import { useNavigate } from "react-router-dom";
import { Client } from "../../types";
import { TrashIcon } from "@heroicons/react/20/solid";

type ClientCardProps = {
   client: Client;
};
export default function ClientCard({ client }: ClientCardProps) {
   const navigate = useNavigate();

   return (
      <div className="grid grid-cols-8 w-full p-4 border-b-1 border-gray-200 items-center">
         <p className="text-lg  text-center">{client.name}</p>
         <p className="text-lg text-center">{client.phoneNumber}</p>
         <p className="text-lg  text-center">{client.address}</p>
         <p className="text-lg  text-center">{client.cuil}</p>
         <p className="text-lg  text-center">{client.cp}</p>
         <p className="text-lg  text-center">{client.province}</p>
         <p className="text-lg  text-center">{client.city}</p>
         <div className="flex gap-2 items-center">
            <button
               className=" text-flirt-950 text-lg font-semibold mx-auto bg-flirt-500 p-2 rounded-md w-1/2 cursor-pointer hover:scale-105 duration-200"
               onClick={() => {
                  navigate(location.pathname + `?clientId=${client._id}`);
               }}
            >
               Editar
            </button>
            <TrashIcon
               className="size-9 text-red-500 cursor-pointer hover:scale-110 duration-200"
               onClick={() => {
                  navigate(location.pathname + `?confirmDelete=${client._id}`);
               }}
            />
         </div>
      </div>
   );
}
