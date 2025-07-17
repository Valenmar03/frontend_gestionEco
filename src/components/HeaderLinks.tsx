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
      <Link
         to={page.url}
         className={`w-full text-xl text-white hover:bg-vida-loca-500 py-4 px-7 cursor-pointer duration-200 shadow-sm
               ${isFocus ? "bg-vida-loca-500" : ""}
         `}
      >
         {page.title}
      </Link>
   );
}
