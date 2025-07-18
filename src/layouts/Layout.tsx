import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeaderLinks from "../components/HeaderLinks";
import { pages } from "../data";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/20/solid";
import { useAuth } from "../hooks/useAuth";
import Spinner from "../components/Spinner";

export default function Layout() {
   const navigate = useNavigate();
   const { data, isError, isLoading } = useAuth();

   const logOut = () => {
      localStorage.removeItem("AUTH_TOKEN");
      navigate("/auth/login");
   };

   const homePage = {
      title: "Inicio",
      url: "/",
      description: "Página principal",
      textColor: "text-slate-600",
      borderColor: "border-slate-600",
      bgFocusColor: "bg-slate-400",
      bgColor: "bg-slate-200",
      hoverColor: "hover:bg-slate-300",
      headerTextColor: "text-slate-800",
   };

   if (isError) return <Navigate to="/auth/login" />;
   if (isLoading)
      return (
         <div className="flex items-center justify-center h-screen w-full">
            <Spinner />
         </div>
      );

   return (
      <>
         {/* Header */}
         <header className="bg-vida-loca-200 p-4 shadow">
            <div className="max-w-screen-xl mx-auto flex justify-between items-center">
               <img
                  src="/LogoTexto.png"
                  alt="Logo Ecorgánico"
                  className="w-64 sm:w-72"
               />
               <ArrowRightStartOnRectangleIcon
                  className="w-10 h-10 text-red-500 cursor-pointer"
                  onClick={logOut}
                  title="Cerrar sesión"
               />
            </div>
         </header>

         {/* Layout principal */}
         <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-vida-loca-700/90 text-white">
               <nav className="flex flex-col">
                  <HeaderLinks page={homePage} />
                  {pages.map((page) => (
                     <HeaderLinks key={page.title} page={page} />
                  ))}
               </nav>
            </aside>

            {/* Contenido principal */}
            <div className="flex-1 flex flex-col px-6 py-8">
               <main className="flex-grow bg-white p-6 rounded shadow">
                  <Outlet />
               </main>

               <footer className="mt-10 border-t pt-4 text-center text-gray-600 text-sm">
                  © 2024 Valentín Martinez – Todos los derechos reservados
               </footer>
            </div>
         </div>

         {/* Toasts */}
         <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
      </>
   );
}
