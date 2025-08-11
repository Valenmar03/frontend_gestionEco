import {
   RectangleStackIcon ,
   ClipboardDocumentListIcon,
   CurrencyDollarIcon,
   UserGroupIcon,
   ChartBarIcon,
   BanknotesIcon 
} from "@heroicons/react/24/solid";

import type { ComponentType, SVGProps } from "react";

type PageIcon = ComponentType<SVGProps<SVGSVGElement>>;

export type Page = {
   title: string;
   url: string;
   description: string;
   icon: PageIcon;
   textColor: string;
   borderColor: string;
   bgFocusColor: string;
   bgColor: string;
   hoverColor: string;
   headerTextColor: string;
};

export const pages : Page[] = [
   {
      title: "Productos",
      url: "/products",
      description: "Gestioná tus productos",
      icon: RectangleStackIcon,
      textColor: "text-vida-loca-700",
      borderColor: "border-vida-loca-700",
      bgFocusColor: "bg-vida-loca-400",
      bgColor: "bg-vida-loca-200",
      hoverColor: "hover:bg-vida-loca-300",
      headerTextColor: "text-vida-loca-800",
   },
   {
      title: "Control de Stock",
      url: "/stock-management",
      description: "Administra el stock de tu negocio",
      icon: ClipboardDocumentListIcon,
      textColor: "text-orange-400",
      borderColor: "border-orange-400",
      bgFocusColor: "bg-orange-400/80",
      bgColor: "bg-orange-200",
      hoverColor: "hover:bg-orange-300",
      headerTextColor: "text-orange-900",
   },
   {
      title: "Ventas",
      url: "/sales",
      description: "Maneja las ventas de tus productos",
      icon: CurrencyDollarIcon,
      textColor: "text-royal-purple-600",
      borderColor: "border-royal-purple-600",
      bgFocusColor: "bg-royal-purple-400",
      bgColor: "bg-royal-purple-200",
      hoverColor: "hover:bg-royal-purple-300",
      headerTextColor: "text-royal-purple-800",
   },
   {
      title: "Clientes",
      url: "/clients",
      description: "Administra tus clientes",
      icon: UserGroupIcon,
      textColor: "text-flirt-600",
      borderColor: "border-flirt-600",
      bgFocusColor: "bg-flirt-400",
      bgColor: "bg-flirt-200",
      hoverColor: "hover:bg-flirt-300",
      headerTextColor: "text-flirt-800",
   },
   {
      title: "Gastos",
      url: "/expenses",
      description: "Registrá y controlá tus gastos",
      icon: BanknotesIcon,
      textColor: "text-caribbean-green-600",
      borderColor: "border-caribbean-green-600",
      bgFocusColor: "bg-caribbean-green-400",
      bgColor: "bg-caribbean-green-200",
      hoverColor: "hover:bg-caribbean-green-300",
      headerTextColor: "text-caribbean-green-800",
   },
   {
      title: "Resumen Financiero",
      url: "/finances",
      description: "Revisá entradas y salidas",
      icon: ChartBarIcon,
      textColor: "text-monza-600",
      borderColor: "border-monza-600",
      bgFocusColor: "bg-monza-400",
      bgColor: "bg-monza-200",
      hoverColor: "hover:bg-monza-300",
      headerTextColor: "text-monza-800",
   },
];
