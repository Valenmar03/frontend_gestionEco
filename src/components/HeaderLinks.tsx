import { Link, useLocation } from "react-router-dom";

type HeaderLinksProps = {
   page: {
      title: string;
      url: string;
      description: string;
      textColor: string;
      borderColor: string;
      bgFocusColor: string;
      bgColor: string;
      hoverColor: string;
      headerTextColor: string;
   };
};

export default function HeaderLinks({ page }: HeaderLinksProps) {
   const { pathname } = useLocation();
   const isFocus =
      page.url === "/" ? pathname === "/" : pathname.startsWith(page.url);

   return (
      <li>
         <Link
            to={page.url}
            className={`pt-2 px-7 rounded-t-lg duration-200  ${
               page.headerTextColor
            } ${
               isFocus
                  ? `pb-5 ${page.bgFocusColor}`
                  : `pb-3 ${page.bgColor} ${page.hoverColor}`
            }`}
         >
            {page.title}
         </Link>
      </li>
   );
}
