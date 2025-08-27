import { useLocation, useNavigate } from "react-router-dom";
import { Expense } from "../../types";
import { formatCurrency, formatYMD } from "../../helpers";
import { TrashIcon } from "@heroicons/react/24/solid";

export default function ExpenseRow(expense: Expense) {
  const navigate = useNavigate();
   const location = useLocation();

   return (
      <tr className="border-b border-gray-300">
         <td className="px-4 py-3  whitespace-nowrap">
            {expense.description}
         </td>
         <td className="px-4 py-3  whitespace-nowrap">
            {expense.category}
         </td>
         <td className="px-4 py-3  whitespace-nowrap">
            {formatCurrency(expense.amount)} 
         </td>
         <td className="px-4 py-3  whitespace-nowrap">
            {expense.notes}
         </td>
         <td className="px-4 py-3  whitespace-nowrap">
            {formatYMD(expense.date)}
         </td>
         <td className="px-4 py-3">
            <div className="flex justify-around gap-2  items-center">
               <button
                  className="bg-caribbean-green-400 hover:scale-105 text-caribbean-green-800 font-semibold px-4 py-2 rounded transition duration-200 cursor-pointer"
                  onClick={() =>
                     navigate(`${location.pathname}?expenseId=${expense._id}`)
                  }
               >
                  Editar
               </button>
               <TrashIcon
                  className="size-8 text-red-500 cursor-pointer hover:scale-110 transition"
                  onClick={() =>
                     navigate(
                        `${location.pathname}?confirmDelete=${expense._id}`
                     )
                  }
               />
            </div>
         </td>
      </tr>
   );
}
