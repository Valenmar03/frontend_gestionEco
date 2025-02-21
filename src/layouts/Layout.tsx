import { Outlet } from "react-router-dom";
import HeaderLinks from "../components/HeaderLinks";
import { pages } from "../data";

export default function Layout() {

   return (
      <>
         <header className="pt-5 px-5 bg-white mb-3 pb-1">
            <img src="/LogoTexto.png" alt="Logo Ecorganico" className="w-72 mx-2" />
            <nav>
               <ul className="flex mt-10 mx-5 text-vida-loca-900 text-xl">
                  <HeaderLinks path="/" title="Inicio" />
                  {
                     pages.map((page) => (
                        <HeaderLinks key={page.title} path={page.url} title={page.title} />
                     ))
                  }
               </ul>
            </nav>
         </header>
         <Outlet />
      </>
   );
}
