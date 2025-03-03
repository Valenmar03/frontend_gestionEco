import { isAxiosError } from "axios";
import api from "../lib/axios";
import { CreateProductForm } from "../types";

export async function createProduct(formData: CreateProductForm){
    try {
        const { data } = await api.post("/products", formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}