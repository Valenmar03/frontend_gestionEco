import { isAxiosError } from "axios";
import api from "../lib/axios";
import { Client, CreateClientForm } from "../types";

export async function createClient(formData: CreateClientForm){
    try {
        const { data } = await api.post("/client", formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data)
        }
    }
}

export async function getClients(){
    try {
        const { data } = await api<Client[]>("/client")
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data)
        }
    }
}

type UpdateClientType = {
    id: string;
    formData: CreateClientForm;
}
export async function updateClient({id, formData} : UpdateClientType){
    try {
        const { data } = await api.put(`/client/${id}`, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data)
        }
    }
}

export async function deleteClient({id} : {id: string}){
    try {
        const { data } = await api.delete(`/client/${id}`)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data)
        }
    }
}