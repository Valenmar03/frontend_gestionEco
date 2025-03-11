import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeaderLinks from "../components/HeaderLinks";
import { pages } from "../data";

export default function Layout() {
   const homePage = {
      title: "Inicio",
      url: "/",
      description: "Página principal",
      textColor: "text-slate-600",
      borderColor: "border-slate-600",
      bgFocusColor: "bg-slate-400",
      bgColor: "bg-slate-200",
      hoverColor: "hover:bg-slate-300",
   };
   return (
      <>
         <header className="pt-5 px-5 bg-white mb-3 pb-1">
            <div className="max-w-4/5 mx-auto">
               <img
                  src="/LogoTexto.png"
                  alt="Logo Ecorganico"
                  className="w-72 mx-2"
               />
            </div>
            <nav>
               <ul className="flex mt-10 mx-auto max-w-4/5 text-xl">
                  <HeaderLinks page={homePage} />
                  {pages.map((page) => (
                     <HeaderLinks key={page.title} page={page} />
                  ))}
               </ul>
            </nav>
         </header>
         <main className="bg-gray-50 p-10 shadow rounded max-w-4/5 mx-auto">
            <Outlet />
         </main>

         <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
      </>
   );
}
