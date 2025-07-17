import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeaderLinks from "../components/HeaderLinks";
import { pages } from "../data";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/20/solid";
import { useAuth } from "../hooks/useAuth";
import Spinner from "../components/Spinner";

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
      headerTextColor: "text-slate-800",
   };

   const { data, isError, isLoading } = useAuth();

   const navigate = useNavigate();
   const logOut = () => {
      localStorage.removeItem("AUTH_TOKEN");
      navigate("/auth/login");
   };

   if (isError) return <Navigate to={"/auth/login"}></Navigate>;
   if (isLoading)
      return (
         <div className="w-full h-screen mx-auto flex items-center justify-center">
            <Spinner />
         </div>
      );
   if (data)
      return (
         <>
            <header className="p-5 bg-vida-loca-200">
               <div className="max-w-4/5 mx-auto flex justify-between items-center">
                  <img
                     src="/LogoTexto.png"
                     alt="Logo Ecorganico"
                     className="w-72 mx-2"
                  />
                  <ArrowRightStartOnRectangleIcon
                     className="size-10 text-red-500 cursor-pointer"
                     onClick={logOut}
                  />
               </div>
            </header>
            <div className="flex">
               <aside className="bg-vida-loca-700/90 w-2/8 mr-10 min-h-screen">
                  <nav className="flex flex-col w-full divide-y divide-vida-loca-700/80">
                     <HeaderLinks page={homePage} />
                     {pages.map((page) => (
                        <HeaderLinks key={page.title} page={page} />
                     ))}
                  </nav>
               </aside>
               <div className="flex flex-col w-full">
                  <main className="bg-gray-50 p-10 shadow rounded  mx-auto mt-10">
                     <Outlet />
                  </main>
                  <footer className="mt-10 border-t-2 w-full mx-auto border-gray-300 py-5">
                     <p className="text-center text-lg">
                        Valentín Martinez | 2024 ©
                     </p>
                  </footer>
               </div>
            </div>

            <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
         </>
      );
}
