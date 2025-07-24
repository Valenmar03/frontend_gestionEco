import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeaderLinks from "../components/HeaderLinks";
import { pages } from "../data";
import {
   ArrowRightStartOnRectangleIcon,
   Bars3Icon,
} from "@heroicons/react/20/solid";
import { useAuth } from "../hooks/useAuth";
import Spinner from "../components/Spinner";
import { useEffect, useState } from "react";

export default function Layout() {
   const navigate = useNavigate();
   const { isError, isLoading } = useAuth();

   const [showNav, setShowNav] = useState(true);
   const [isMobile, setIsMobile] = useState(false);

   useEffect(() => {
      if (window.innerWidth < 640) {
         setIsMobile(true)
         setShowNav(false);
      }
   }, []);

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
         <header className="bg-vida-loca-200 p-4 shadow fixed w-full top-0 z-50">
            <div className="max-w-screen mx-auto flex justify-between items-center px-4 sm:px-10">
               <div className="flex items-center gap-4 sm:gap-10">
                  <Bars3Icon
                     className="size-10 text-vida-loca-800 cursor-pointer hover:bg-vida-loca-300 p-1 rounded-md"
                     onClick={() => setShowNav(!showNav)}
                  />
                  <img
                     src={`${ isMobile ? "/Logo.png" : "/LogoTexto.png"}`}
                     alt="Logo Ecorgánico"
                     className="w-12 sm:w-52"
                  />
               </div>
               <ArrowRightStartOnRectangleIcon
                  className="w-9 h-9 text-red-500 cursor-pointer"
                  onClick={logOut}
                  title="Cerrar sesión"
               />
            </div>
         </header>

         {showNav && (
            <div
               className="fixed inset-0 z-30 bg-black opacity-50 sm:hidden"
               onClick={() => setShowNav(false)}
            />
         )}

         <div className="flex pt-20 bg-gray-100 relative">
            <aside
               className={`
                  fixed sm:static z-40 top-0 left-0 min-h-screen w-64 bg-vida-loca-700 sm:bg-vida-loca-700/90 text-white
                  transform transition-transform duration-300 ease-in-out
                  ${showNav ? "translate-x-0" : "-translate-x-full"}
                  sm:translate-x-0 sm:block
               `}
            >
               <nav className="flex flex-col mt-20 sm:mt-0">
                  <HeaderLinks page={homePage} />
                  {pages.map((page) => (
                     <HeaderLinks key={page.title} page={page} />
                  ))}
               </nav>
            </aside>

            <div className="flex-1 flex flex-col px-6 py-8 sm:px-50">
               <main className="bg-white p-6 rounded shadow pb-10">
                  <Outlet />
               </main>

               <footer className="mt-10 border-t pt-4 text-center text-gray-600 text-sm">
                  © 2024 Valentín Martinez 
               </footer>
            </div>
         </div>

         <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
      </>
   );
}
