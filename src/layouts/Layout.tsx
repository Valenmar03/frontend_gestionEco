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
   };

   const { data, isError, isLoading } = useAuth();

   const navigate = useNavigate()
   const logOut = () => {
      localStorage.removeItem("AUTH_TOKEN");
      navigate("/auth/login");
   };

   if (isLoading)
      return (
         <div className="w-full h-screen mx-auto flex items-center justify-center">
            <Spinner />
         </div>
      );
   if (isError) return <Navigate to={"/auth/login"}></Navigate>;
   if(data) return (
      <>
         <header className="pt-5 px-5 bg-white mb-3 pb-1">
            <div className="max-w-4/5 mx-auto flex justify-between items-end">
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
            <nav>
               <ul className="flex mt-10 mx-auto max-w-4/5 text-xl">
                  <HeaderLinks page={homePage} />
                  {pages.map((page) => (
                     <HeaderLinks key={page.title} page={page} />
                  ))}
               </ul>
            </nav>
         </header>
         <main className="bg-gray-50 p-10 shadow rounded max-w-4/5 mx-auto max-h-screen">
            <Outlet />
         </main>

         <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
      </>
   );
}
