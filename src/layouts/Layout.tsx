import { Outlet } from "react-router-dom";
import HeaderLinks from "../components/HeaderLinks";
import { pages } from "../data";

export default function Layout() {

   const homePage = {
         title: 'Inicio',
        url: '/',
        description: 'Página principal',
        textColor: 'text-slate-600',
        borderColor: 'border-slate-600',
        bgFocusColor: 'bg-slate-400',
        bgColor: 'bg-slate-200',
        hoverColor: 'hover:bg-slate-300'
   }

   return (
      <>
         <header className="pt-5 px-5 bg-white mb-3 pb-1">
            <img src="/LogoTexto.png" alt="Logo Ecorganico" className="w-72 mx-2" />
            <nav>
               <ul className="flex mt-10 mx-5 text-xl">
                  <HeaderLinks page={homePage} />
                  {
                     pages.map((page) => (
                        <HeaderLinks key={page.title} page={page} />
                     ))
                  }
               </ul>
            </nav>
         </header>
         <Outlet />
      </>
   );
}
