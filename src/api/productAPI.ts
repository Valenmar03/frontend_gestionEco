import { isAxiosError } from "axios";
import api from "../lib/axios";
import { CreateProductForm, Product } from "../types";


export async function createProduct(formData: CreateProductForm){
    try {
        const { data } = await api.post("/products", formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data)
        }
    }
}

export async function getProducts(){
    try {
        const { data } = await api<Product[]>("/products")
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data)
        }
    }
}

type UpdateProductType = {
    id: string;
    formData: CreateProductForm;
}
export async function updateProduct({id, formData}: UpdateProductType){
    try {
        const { data } = await api.put(`/products/${id}`, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            console.log(error)
            throw new Error(error.response.data)
        }
    }
}

export async function deleteProduct({id} : {id: string}){
    try {
        const { data } = await api.delete(`/products/${id}`)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data)
        }
    }
}

type AddStockType = {
    id: string;
    stock: number;
}
export async function addStock(products: AddStockType[]){
    try {
        const { data } = await api.patch(`/products/addStock`, products)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data)
        }
    }
}