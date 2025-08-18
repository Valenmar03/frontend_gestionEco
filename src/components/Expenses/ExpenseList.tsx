import { useEffect, useMemo, useState } from "react";
import ModalComponent from "../ModalComponent";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useLocation, useNavigate } from "react-router-dom";
import { getExpenses, getExpensesByMonth } from "../../api/expensesAPI";
import { useQuery } from "@tanstack/react-query";
import { Expense } from "../../types";
import ExpenseRow from "./ExpenseRow";
import Spinner from "../Spinner";
import DeleteExpenseModal from "./DeleteExpenseModal";

export default function ExpenseList() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [expenseData, setExpenseData] = useState<Expense | null>(null);

  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  const navigate = useNavigate();
  const location = useLocation();

  const { data: expenses = [], isError, isLoading } = useQuery({
    queryKey: ["expenses"],
    //queryFn: getExpenses,
    queryFn: () => getExpensesByMonth(month, year),
  });

  const queryParams = new URLSearchParams(location.search);
  const expenseId = queryParams.get("expenseId");
  const confirmDelete = queryParams.get("confirmDelete");

  useEffect(() => {
    if (expenseId || confirmDelete) {
      setIsOpen(true);
      const id = expenseId ?? confirmDelete ?? "";
      setExpenseData(expenses.find((e) => e._id === id) ?? null);
    }
  }, [expenseId, confirmDelete, expenses]);

  useEffect(() => {
    if (!isOpen) navigate("", { replace: true });
  }, [isOpen, navigate]);

  const filteredExpenses = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return expenses;
    return expenses.filter((e) => (e.description ?? "").toLowerCase().includes(q));
  }, [expenses, search]);

  if (isLoading) return <Spinner />;
  if (isError) return <p className="text-center text-red-600">Error al cargar los gastos</p>;

  return (
    <>
      <div className="flex items-center mb-2 justify-end">
        <div className="flex items-center bg-gray-200 rounded-md overflow-hidden">
          <input
            type="text"
            className="bg-gray-200 p-3 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Búsqueda por descripción"
            aria-label="Buscar gasto por descripción"
          />
          {search && (
            <button onClick={() => setSearch("")} className="p-2 hover:opacity-80" aria-label="Limpiar búsqueda">
              <XMarkIcon className="size-6 text-gray-600" />
            </button>
          )}
          <MagnifyingGlassIcon className="size-10 text-gray-600 p-2" />
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="min-w-[700px] sm:min-w-full text-lg text-left">
          <thead className="bg-gray-100 text-xl">
            <tr>
              <th className="px-4 py-2">Descripción</th>
              <th className="px-4 py-2">Categoría</th>
              <th className="px-4 py-2">Monto</th>
              <th className="px-4 py-2">Notas</th>
              <th className="px-4 py-2">Fecha</th>
              <th className="px-4 py-2 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.length > 0 ? (
              filteredExpenses.map((expense) => <ExpenseRow key={expense._id} {...expense} />)
            ) : (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                  No hay gastos que coincidan con la búsqueda
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ModalComponent isOpen={isOpen} setIsOpen={setIsOpen}>
        {(expenseId || confirmDelete) && (
          <>
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2"
              aria-label="Cerrar"
            >
              <XMarkIcon className="size-6 cursor-pointer hover:text-red-600 duration-200" />
            </button>

            {expenseId && (
              <>
                <h2 className="text-3xl font-bold text-caribbean-green-500">Editar Gasto</h2>
                <p className="text-caribbean-green-500/80">Ingrese todos los datos necesarios para editar el gasto</p>
                {/* TODO: colocar <UpdateExpenseForm expense={expenseData!} setIsOpen={setIsOpen} /> */}
              </>
            )}

            {confirmDelete && (
              <>
                <DeleteExpenseModal expense={expenseData!} setIsOpen={setIsOpen} />
              </>
            )}
          </>
        )}
      </ModalComponent>
    </>
  );
}
