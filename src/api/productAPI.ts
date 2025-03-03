import { isAxiosError } from "axios";
import api from "../lib/axios";
import { CreateProductForm, Product } from "../types";

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


export async function getProducts(){
    try {
        const { data } = await api<Product[]>("/products")
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}