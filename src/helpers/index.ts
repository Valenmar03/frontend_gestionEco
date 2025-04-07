import { SaleType } from "../types";

export function formatCurrency(price: number) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency', currency: 'USD'
    }).format(price);
}

export const translateType = (type: SaleType) => {
    if(type === "wholesalePrice") return "Mayorista"
    if(type === "retailPrice") return "Minorista"
    if(type === "mercadoLibrePrice") return "Mercado Libre"
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