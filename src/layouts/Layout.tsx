import { Link, Outlet } from "react-router-dom";
import HeaderLinks from "../components/HeaderLinks";

export default function Layout() {

   return (
      <>
         <header className="pt-5 px-5 bg-white mb-10 pb-1">
            <img src="/LogoTexto.png" alt="Logo Ecorganico" className="w-72" />
            <nav>
               <ul className="flex mt-10 text-vida-loca-900  text-xl">
                  <HeaderLinks path="/" title="Inicio" />
                  <HeaderLinks path="/control-stock" title="Control de Stock" />
                  <HeaderLinks path="/facturas" title="Facturas" />
               </ul>
            </nav>
         </header>
         <Outlet />
      </>
   );
}
