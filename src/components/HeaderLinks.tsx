import { Link, useLocation } from "react-router-dom";
import { Page } from "../data";

type HeaderLinksProps = Pick<Page, "title" | "url" | "icon"> & {
  collapsed?: boolean;
};

export default function HeaderLinks({ title, url, icon: Icon, collapsed = false }: HeaderLinksProps) {
  const { pathname } = useLocation();
  const isFocus = url === "/" ? pathname === "/" : pathname.startsWith(url);

  return (
    <Link
      to={url}
      className={[
        "w-full text-white cursor-pointer duration-200 shadow-sm flex items-center",
        collapsed ? "justify-center gap-0 py-4 px-0" : "gap-3 py-4 px-7 text-xl",
        isFocus ? "bg-vida-loca-500" : "hover:bg-vida-loca-500",
      ].join(" ")}
      title={collapsed ? title : undefined} // tooltip útil cuando está colapsado
    >
      <Icon className={collapsed ? "size-6" : "size-6"} />
      {!collapsed && <span className="whitespace-nowrap">{title}</span>}
    </Link>
  );
}
