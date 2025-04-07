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