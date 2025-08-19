import { Link } from "react-router-dom";
import { pages } from "../data";

export default function DashboardView() {
   return (
      <>
         <h1 className="text-center text-5xl font-semibold">
            Gestión Ecorganico
         </h1>
         <h2 className="text-center text-xl mt-2 ">
            Gestioná tu negocio
         </h2>
         <div className="flex flex-wrap justify-center">
            {pages.map(({title, url, borderColor, textColor, icon: Icon, description}) => (
               <Link
                  to={url}
                  key={title}
                  className={`p-5 shadow-xl m-5 lg:m-8 w-full lg:w-2/5 xl:w-1/4 rounded-md bg-white border-l-4 ${borderColor} hover:scale-105 duration-300`}
               >
                  <h3
                     className={`text-3xl font-bold ${textColor} duration-150 flex items-center gap-3`}
                  >
                     <Icon className="size-6"/>
                     {title}
                  </h3>
                  <p className="text-lg">{description}</p>
               </Link>
            ))}
         </div>
      </>
   );
}
