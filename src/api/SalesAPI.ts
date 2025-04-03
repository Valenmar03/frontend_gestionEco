import { isAxiosError } from "axios"
import api from "../lib/axios"
import { CreateSaleForm } from "../types"


export async function createSale(formData: CreateSaleForm){
    try {
        const { data } = await api.post("/sales", formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data)
        }
    }
}