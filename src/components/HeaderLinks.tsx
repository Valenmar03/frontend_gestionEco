import { Link, useLocation } from "react-router-dom";
import { Page } from "../data";

type HeaderLinksProps = Pick<Page, "title" | "url" | "icon">


export default function HeaderLinks({ title, url, icon: Icon }: HeaderLinksProps) {
   const { pathname } = useLocation();
   const isFocus =
      url === "/" ? pathname === "/" : pathname.startsWith(url);

   return (
      <Link
         to={url}
         className={`w-full text-xl text-white hover:bg-vida-loca-500 py-4 px-7 cursor-pointer duration-200 shadow-sm flex items-center gap-3
               ${isFocus ? "bg-vida-loca-500" : ""}
         `}
      >
         <Icon className="w-5 h-5" />
         {title}
      </Link>
   );
}
