import { Outlet, Navigate, useNavigate, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeaderLinks from "../components/HeaderLinks";
import { Page, pages } from "../data";
import {
   ArrowRightStartOnRectangleIcon,
   Bars3Icon,
   HomeIcon,
} from "@heroicons/react/20/solid";
import { useAuth } from "../hooks/useAuth";
import Spinner from "../components/Spinner";
import { useEffect, useState } from "react";

export default function Layout() {
   const navigate = useNavigate();
   const { isError, isLoading } = useAuth();

   const [isMobileOpen, setIsMobileOpen] = useState(false);
   const [isCollapsed, setIsCollapsed] = useState(false);
   const [isMobile, setIsMobile] = useState(false);

   useEffect(() => {
      const handleResize = () => {
         const mobile = window.innerWidth < 640;
         setIsMobile(mobile);
         if (!mobile) setIsMobileOpen(false); // cerrar drawer al pasar a desktop
      };
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
   }, []);

   const logOut = () => {
      localStorage.removeItem("AUTH_TOKEN");
      navigate("/auth/login");
   };

   const homePage: Page = {
      title: "Inicio",
      url: "/",
      description: "Página principal",
      icon: HomeIcon,
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
               <div className="flex items-center gap-4 sm:gap-6">
                  <Bars3Icon
                     className="size-10 text-vida-loca-800 cursor-pointer hover:bg-vida-loca-300 p-1 rounded-md"
                     onClick={() =>
                        isMobile
                           ? setIsMobileOpen((v) => !v)
                           : setIsCollapsed((v) => !v)
                     }
                  />
                  <Link to="/">
                     <img
                        src="/Logo.png"
                        alt="Ecorgánico"
                        className="w-12 sm:hidden"
                     />
                     <img
                        src="/LogoTexto.png"
                        alt="Ecorgánico"
                        className="hidden sm:block w-52"
                     />
                  </Link>
               </div>

               <ArrowRightStartOnRectangleIcon
                  className="w-9 h-9 text-red-500 cursor-pointer"
                  onClick={logOut}
                  title="Cerrar sesión"
               />
            </div>
         </header>

         {isMobileOpen && (
            <div
               className="fixed inset-0 z-30 bg-black/50 sm:hidden"
               onClick={() => setIsMobileOpen(false)}
            />
         )}

         <div className="flex pt-20 bg-gray-100">
            <aside
               className={[
                  "fixed top-16 left-0 h-[calc(100vh-4rem)] z-40",
                  "bg-vida-loca-700 text-white overflow-hidden",
                  "transition-transform duration-300 will-change-transform",
                  "w-72",
                  isMobileOpen ? "translate-x-0" : "-translate-x-full",
                  "sm:translate-x-0 sm:fixed sm:top-16 sm:left-0",
                  isCollapsed ? "sm:w-16" : "sm:w-72",
               ].join(" ")}
            >
               <nav className="flex flex-col py-4">
                  <HeaderLinks
                     title={homePage.title}
                     url={homePage.url}
                     icon={homePage.icon}
                     collapsed={isCollapsed}
                  />
                  {pages.map(({ title, url, icon }) => (
                     <HeaderLinks
                        key={title}
                        title={title}
                        url={url}
                        icon={icon}
                        collapsed={isCollapsed}
                     />
                  ))}
               </nav>
            </aside>

            <div
               className={[
                  "flex-1 flex flex-col px-6 py-8 transition-[margin] duration-300 w-full",
                  isCollapsed ? "sm:ml-16" : "sm:ml-72",
                  "ml-0",
               ].join(" ")}
            >
               <main className="bg-white p-6 rounded shadow pb-10">
                  <Outlet />
               </main>
               <footer className="mt-10 border-t pt-4 text-center text-gray-600 text-sm">
                  © 2025 Valentín Martinez
               </footer>
            </div>
         </div>

         <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
      </>
   );
}
