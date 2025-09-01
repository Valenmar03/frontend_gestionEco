import { SaleType } from "../types";

export function formatCurrency(price: number) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency', currency: 'USD'
    }).format(price);
}

export const translateType = (type: SaleType) => {
    if(type === "wholesale") return "Mayorista"
    if(type === "retail") return "Minorista"
    if(type === "mercadoLibre") return "Mercado Libre"
}

export const formatDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    };
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('es-AR', options);
}

const MONTHS = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];

export function formatYMD(ymd: string) {
  const [y, m, d] = ymd.split("-");
  void y;
  return `${d.padStart(2, "0")} ${MONTHS[Number(m) - 1]}`;
}
