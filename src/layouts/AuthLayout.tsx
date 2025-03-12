import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function AuthLayout() {
   return (
      <>
         <header className="p-5 bg-white mb-3">
            <div className="max-w-4/5 mx-auto">
               <img
                  src="/LogoTexto.png"
                  alt="Logo Ecorganico"
                  className="w-72 mx-2"
               />
            </div>
         </header>
         <Outlet />

         <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
      </>
   );
}
