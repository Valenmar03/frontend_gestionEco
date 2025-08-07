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