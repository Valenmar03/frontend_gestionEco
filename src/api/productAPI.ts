import api from "../lib/axios";
import { CreateProductForm } from "../types";

export async function createProduct(formData: CreateProductForm){
    try {
        const { data } = await api.post("/products", formData)
        return data
    } catch (error) {
        console.log(error)
    }
}