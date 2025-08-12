import { useEffect, useMemo, useState } from "react";
import ModalComponent from "../ModalComponent";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useLocation, useNavigate } from "react-router-dom";
import { getExpenses, getExpensesByMonth } from "../../api/expensesAPI";
import { useQuery } from "@tanstack/react-query";
import { Expense } from "../../types";
import ExpenseRow from "./ExpenseRow";

export default function ExpenseList() {
   const [isOpen, setIsOpen] = useState(false);
   const [search, setSearch] = useState("");
   const [expenseData, setExpenseData] = useState<Expense>();

   const now = new Date();
   const month = now.getMonth() + 1;
   const year = now.getFullYear();

   const navigate = useNavigate();
   const location = useLocation();

   const {
      data: expenses,
      isError,
      isLoading,
   } = useQuery({
      queryKey: ["expenses"],
      queryFn: getExpenses,
   });

   const queryParams = new URLSearchParams(location.search);
   const expenseId = queryParams.get("expenseId");
   const confirmDelete = queryParams.get("confirmDelete");

   useEffect(() => {
      if (expenseId || confirmDelete) {
         setIsOpen(true);
         const id = expenseId ?? confirmDelete ?? "";
         setExpenseData(expenses?.find((e) => e._id === id));
      }
   }, [expenseId, confirmDelete, expenses]);

   useEffect(() => {
      if (!isOpen) {
         navigate("", { replace: true });
      }
   }, [isOpen]);

   const filteredExpenses = useMemo(
      () =>
         (expenses ?? []).filter((e) =>
            `${e.description}`.toLowerCase().includes(search.toLowerCase())
         ),
      [expenses, search]
   );

   return (
      <>
         <div className="flex items-center mb-2 divide-x-2 divide-gray-300 justify-end">
            <input
               type="text"
               className=" bg-gray-200 p-3 rounded-l-md"
               value={search}
               onChange={(e) => setSearch(e.target.value)}
               placeholder="Busqueda por descripcion"
            />
            <MagnifyingGlassIcon className="size-12 text-gray-500 bg-gray-200 p-2 rounded-r-md" />
         </div>
         <div className="w-full overflow-x-auto">
            <table className="min-w-[700px] sm:min-w-full text-lg text-left">
               <thead className="bg-gray-100 text-xl">
                  <tr>
                     <th className="px-4 py-2">Descripcion</th>
                     <th className="px-4 py-2">Categoria</th>
                     <th className="px-4 py-2">Monto</th>
                     <th className="px-4 py-2">Notas</th>
                     <th className="px-4 py-2">Fecha</th>
                     <th className="px-4 py-2 text-center">Acciones</th>
                  </tr>
               </thead>
               <tbody>
                  {expenses ? (
                     filteredExpenses!.map((expense) => (
                        <ExpenseRow key={expense._id} {...expense} />
                     ))
                  ) : (
                     <tr>
                        <td
                           colSpan={6}
                           className="px-4 py-6 text-center text-gray-500"
                        >
                           No hay gastos que coincidan con la búsqueda
                        </td>
                     </tr>
                  )}
               </tbody>
            </table>
         </div>
         <ModalComponent isOpen={isOpen} setIsOpen={setIsOpen}>
            {expenseId && (
               <>
                  <h2 className="text-3xl font-bold text-caribbean-green-500">
                     Editar Gasto
                  </h2>
                  <p className="text-caribbean-green-500/80">
                     Ingrese todos los datos necesarios para editar el gasto
                  </p>
                  <button
                     onClick={() => setIsOpen(false)}
                     className="absolute top-2 right-2"
                  >
                     <XMarkIcon className="size-6 cursor-pointer hover:text-red-600 duration-200" />
                  </button>
                  {/* <UpdateProductForm
                     product={productData!}
                     setIsOpen={setIsOpen}
                  /> */}
               </>
            )}
            {confirmDelete && (
               <>
                  {/* <DeleteProductModal
                     product={productData!}
                     setIsOpen={setIsOpen}
                  /> */}
               </>
            )}
         </ModalComponent>
      </>
   );
}
