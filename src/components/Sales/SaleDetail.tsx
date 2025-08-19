import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getSaleById } from "../../api/SalesAPI";
import Spinner from "../Spinner";
import { formatCurrency, formatDate } from "../../helpers";
import { PrinterIcon } from "@heroicons/react/20/solid";
import Invoice from "../Invoice/Invoice";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import ModalComponent from "../ModalComponent";
import DeleteSaleModal from "./DeleteSaleModal";
export default function SaleDetail() {
   const { id } = useParams();
   const navigate = useNavigate();
   const location = useLocation();
   const [isOpen, setIsOpen] = useState(false);

   const {
      data: sale,
      isError,
      isLoading,
   } = useQuery({
      queryKey: ["sale", id],
      queryFn: () => getSaleById(id!),
   });

   const queryParams = new URLSearchParams(location.search);
   const confirmDelete = queryParams.get("confirmDelete");

   useEffect(() => {
      if (!isOpen) {
         navigate("", { replace: true });
      }
   }, [isOpen]);

   if (isLoading) return <Spinner />;
   if (isError) return <p>Error al cargar las ventas</p>;
   if (sale) {
      return (
         <>
            <div className="w-full max-w-5xl mx-auto bg-white shadow-md rounded-xl p-4 sm:p-6 lg:p-8 mt-6">
               <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-4 items-start sm:items-center mb-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-royal-purple-700 flex gap-3 items-center">
                     Venta #{sale._id.slice(-6).toUpperCase()}
                     <TrashIcon
                        className="size-6 text-red-500 cursor-pointer hover:scale-110 transition"
                        onClick={() => {
                           setIsOpen(true);
                           navigate(
                              `${location.pathname}?confirmDelete=${sale._id}`
                           );
                        }}
                     />
                  </h2>
                  <p className="text-gray-500 text-sm sm:text-base">
                     Fecha: {formatDate(sale.createdAt)}
                  </p>
               </div>

               <div className="mb-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-royal-purple-600 mb-1">
                     Cliente
                  </h3>
                  <p className="text-gray-700 text-2xl sm:text-3xl font-bold break-words">
                     {sale.client.name}
                  </p>
               </div>

               <div className="mb-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-royal-purple-600 mb-2">
                     Productos
                  </h3>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                     {sale.products.map((prod) => (
                        <div
                           key={prod.product}
                           className="
                              grid gap-2 items-center
                              grid-cols-2 sm:grid-cols-3
                              px-3 sm:px-4 py-2 border-b last:border-b-0 border-gray-300
                           "
                        >
                           {/* Nombre */}
                           <p className="font-medium col-span-2 sm:col-span-1">
                              {prod.product}
                           </p>

                           {/* Cantidad x Precio */}
                           <p className="text-center sm:text-left">
                              {prod.quantity} x {formatCurrency(prod.unitPrice)}
                           </p>

                           {/* Total por renglón */}
                           <p className="font-semibold text-right">
                              {formatCurrency(prod.quantity * prod.unitPrice)}
                           </p>
                        </div>
                     ))}
                  </div>
               </div>

               <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-2 text-royal-purple-700 font-medium text-base sm:text-lg">
                  <p className="text-left">Subtotal:</p>
                  <p className="text-right font-bold">
                     {formatCurrency(sale.subtotal)}
                  </p>

                  <p className="text-left">Descuento:</p>
                  <p className="text-right font-bold">
                     {formatCurrency(sale.discount)}
                  </p>

                  <p className="text-left">IVA:</p>
                  <p className="text-right font-bold">
                     {sale.iva ? "Incluido" : "No incluido"}
                  </p>

                  <p className="text-left">Tipo de precio:</p>
                  <p className="text-right font-bold">
                     {sale.type === "wholesale"
                        ? "Mayorista"
                        : sale.type === "retail"
                        ? "Minorista"
                        : "Mercado Libre"}
                  </p>

                  <div className="md:col-span-4 col-span-2 border-t mt-2 pt-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                     <PDFDownloadLink
                        document={<Invoice sale={sale} />}
                        fileName={`Factura_${sale._id}.pdf`}
                        className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 bg-royal-purple-600 hover:bg-royal-purple-700 text-white text-base sm:text-lg font-medium rounded-md transition"
                     >
                        {({ loading }) =>
                           loading ? (
                              "Generando PDF..."
                           ) : (
                              <>
                                 <PrinterIcon className="size-5" /> Descargar
                                 Presupuesto
                              </>
                           )
                        }
                     </PDFDownloadLink>

                     <p className="text-lg sm:text-xl font-bold text-center md:text-right">
                        Total: {formatCurrency(sale.total)}
                     </p>
                  </div>
               </div>
            </div>

            <ModalComponent isOpen={isOpen} setIsOpen={setIsOpen}>
               {confirmDelete && (
                  <DeleteSaleModal sale={sale} setIsOpen={setIsOpen} />
               )}
            </ModalComponent>
         </>
      );
   }
}
