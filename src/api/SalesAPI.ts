import { isAxiosError } from "axios"
import api from "../lib/axios"
import { CreateSaleForm, Sale } from "../types"


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

export async function getSales(){
    try {
        const { data } = await api<Sale[]>("/sales")
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data)
        }
    }
}

export async function getSaleById(id : string){
    try {
        const { data } = await api<Sale>(`/sales/${id}`)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data)
        }
    }
}