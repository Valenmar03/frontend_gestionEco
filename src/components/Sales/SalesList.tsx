import { useQuery } from "@tanstack/react-query";
import { getSalesByMonth } from "../../api/SalesAPI";
import Spinner from "../Spinner";
import SalesCard from "./SalesCard";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";

export default function SalesList() {
   const [search, setSearch] = useState("");
   const date = useOutletContext<String>();
   const [year, month] = date.split("-");

   const { data, isError, isLoading } = useQuery({
      queryKey: ["sales", month],
      queryFn: () => getSalesByMonth(+month, +year),
   });

   const filteredSales = useMemo(
      () =>
         (data ?? []).filter((sale) =>
            `${sale.client.name}`.toLowerCase().includes(search.toLowerCase())
         ),
      [data, search]
   );

   if (isLoading) return <Spinner />;
   if (isError) return <p>Error al cargar las ventas</p>;
   if (data)
      return (
         <>
            {/* Search */}
            <div className="mb-4">
               <form
                  role="search"
                  className="flex w-full sm:w-auto sm:justify-end"
                  onSubmit={(e) => e.preventDefault()}
               >
                  <div className="flex w-full sm:w-[360px]">
                     <input
                        type="text"
                        className="w-full bg-gray-200 p-3 rounded-l-md placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-royal-purple-400"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Búsqueda por cliente"
                     />
                     <button
                        type="submit"
                        aria-label="Buscar"
                        className="shrink-0 bg-gray-200 px-3 rounded-r-md hover:bg-gray-300 transition"
                     >
                        <MagnifyingGlassIcon className="size-6 text-gray-600" />
                     </button>
                  </div>
               </form>
            </div>

            {/* Grid */}
            <div
               className="
                  grid gap-4 mt-6
                  grid-cols-1
                  sm:grid-cols-2
                  lg:grid-cols-3
                  xl:grid-cols-4
               "
            >
               {filteredSales!.map((sale) => (
                  <SalesCard sale={sale} key={sale._id} />
               ))}
            </div>
         </>
      );
}
