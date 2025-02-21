import { Link } from "react-router-dom";
import { pages } from "../data";

export default function DashboardView() {
   return (
      <main className="bg-gray-50 mx-10 p-10 shadow rounded">
         <h1 className="text-center text-5xl font-bold text-vida-loca-600">
            Gestión Ecorganico
         </h1>
         <h2 className="text-center text-xl mt-2 text-vida-loca-600/90">
            Gestioná tu negocio
         </h2>
         <div className="flex flex-wrap justify-center">
            {pages.map((page) => (
               <Link
                  to={page.url}
                  key={page.title}
                  className={`p-5 shadow-xl m-10 w-1/4 rounded-md bg-white border-l-4 ${page.borderColor} hover:scale-105 duration-300`}
               >
                  <h3
                     className={`text-3xl font-bold ${page.textColor} duration-150`}
                  >
                     {page.title}
                  </h3>
                  <p className="text-lg">{page.description}</p>
               </Link>
            ))}
         </div>
      </main>
   );
}
