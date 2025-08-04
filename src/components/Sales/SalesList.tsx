import { useQuery } from "@tanstack/react-query";
import { getSales } from "../../api/SalesAPI";
import Spinner from "../Spinner";
import SalesCard from "./SalesCard";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

export default function SalesList() {

   const [search, setSearch] = useState("")

   const { data, isError, isLoading } = useQuery({
      queryKey: ["sales"],
      queryFn: getSales,
   });

   const filteredSales = data?.filter(sale => 
      `${sale.client.name}`.toLowerCase().includes(search.toLowerCase())
   )


   if (isLoading) return <Spinner />;
   if (isError) return <p>Error al cargar las ventas</p>;
   if (data)
      return (
         <>
         <div className="flex items-center mb-2 divide-x-2 divide-gray-300 justify-end">
            <input type="text" className=" bg-gray-200 p-3 rounded-l-md" value={search}
               onChange={(e) => setSearch(e.target.value)}/>
            <MagnifyingGlassIcon className="size-12 text-gray-500 bg-gray-200 p-2 rounded-r-md"/>
         </div>
            <div className="grid grid-cols-4 gap-4 mt-10">
               {filteredSales!.map((sale) => (
                  <SalesCard sale={sale} key={sale._id} />
               ))}
            </div>
         </>
      );
}
