import { Link, useLocation } from "react-router-dom";

type HeaderLinksProps = {
   path: string;
   title: string;
};

export default function HeaderLinks({ path, title }: HeaderLinksProps) {
   const { pathname } = useLocation();
   const isActive = pathname === path;

   return (
      <li>
         <Link
            to={path}
            className={`pt-2 px-7 rounded-t-lg duration-200 ${
               isActive
                  ? "pb-5 bg-vida-loca-300 "
                  : "pb-3 bg-vida-loca-100 hover:bg-vida-loca-200"
            }`}
         >
            {title}
         </Link>
      </li>
   );
}
