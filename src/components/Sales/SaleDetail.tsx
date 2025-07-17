import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getSaleById } from "../../api/SalesAPI";
import Spinner from "../Spinner";
import { formatCurrency, formatDate } from "../../helpers";

export default function SaleDetail() {
   const { id } = useParams();

   const {
      data: sale,
      isError,
      isLoading,
   } = useQuery({
      queryKey: ["sale", id],
      queryFn: () => getSaleById(id!),
   });

   if (isLoading) return <Spinner />;
   if (isError) return <p>Error al cargar las ventas</p>;
   if (sale)
      return (
         <div className=" w-4/5 mx-auto bg-white shadow-md rounded-xl p-8 mt-10">
            <div className="flex justify-between items-center mb-6">
               <h1 className="text-3xl font-bold text-royal-purple-700">
                  Venta #{sale._id.slice(-6).toUpperCase()}
               </h1>
               <p className="text-gray-500 text-sm">
                  Fecha: {formatDate(sale.createdAt)}
               </p>
            </div>

            <div className="mb-6">
               <h2 className="text-xl font-semibold text-royal-purple-600 mb-2">
                  Cliente
               </h2>
               <p className="text-gray-700 text-3xl font-bold">
                  {sale.client.name}
               </p>
            </div>

            <div className="mb-6">
               <h2 className="text-xl font-semibold text-royal-purple-600 mb-2">
                  Productos
               </h2>
               <div className="border border-gray-200 rounded-lg overflow-hidden">
                  {sale.products.map((prod) => (
                     <div
                        key={prod.product}
                        className="flex justify-between items-center px-4 py-2 border-b last:border-b-0"
                     >
                        <p className="font-medium">{prod.product}</p>
                        <p>
                           {prod.quantity} x {formatCurrency(prod.unitPrice)}
                        </p>
                        <p className="font-semibold">
                           {formatCurrency(prod.quantity * prod.unitPrice)}
                        </p>
                     </div>
                  ))}
               </div>
            </div>

            <div className="grid grid-cols-5 gap-4 text-right text-royal-purple-700 font-medium text-lg">
               <p className="col-span-1 col-start-4 text-left ">Subtotal: </p>
               <p className="font-bold">{formatCurrency(sale.subtotal)}</p>

               <p className="col-span-1 col-start-4 text-left ">Descuento: </p>
               <span className="font-bold">{formatCurrency(sale.discount)}</span>

               <p className="col-span-1 col-start-4 text-left ">IVA: </p>
               <p className="font-bold">
                  {sale.iva ? "Incluido" : "No incluido"}
               </p>

               <p className="col-span-1 col-start-4 text-left ">Tipo de precio:</p>
               <p className="font-bold">
                  {sale.type === "wholesalePrice"
                     ? "Mayorista"
                     : sale.type === "retailPrice"
                     ? "Minorista"
                     : "Mercado Libre"}
               </p>

               <p className="text-xl font-bold col-span-5 border-t pt-2">
                  Total: {formatCurrency(sale.total)}
               </p>
            </div>

            <p className="text-right text-sm text-gray-400 mt-4">
               Última actualización: {formatDate(sale.updatedAt)}
            </p>
         </div>
      );
}
