import { useQuery } from "@tanstack/react-query";
import { getSales } from "../../api/SalesAPI";
import Spinner from "../Spinner";
import SalesCard from "./SalesCard";

export default function SalesList() {
   const { data, isError, isLoading } = useQuery({
      queryKey: ["sales"],
      queryFn: getSales,
   });

   if (isLoading) return <Spinner />;
   if (isError) return <p>Error al cargar las ventas</p>;
   if (data)
      return (
         <div className="grid grid-cols-4 gap-4 mt-10">
            {data.map((sale) => (
               <SalesCard sale={sale} key={sale._id} />
            ))}
         </div>
      );
}
