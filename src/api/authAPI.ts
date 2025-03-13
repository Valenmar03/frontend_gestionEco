import { isAxiosError } from "axios";
import api from "../lib/axios";
import { UserLoginForm } from "../types";

export async function authenticateUser(formData: UserLoginForm) {
   try {
      const url = "/auth/login";
      const { data } = await api.post(url, formData);
      localStorage.setItem("AUTH_TOKEN", data.token)
      return data;
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data);
      }
   }
}

export async function getUser(){
   try {
      const {data} = await api("/auth/user")
      console.log(data)
      return data
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data);
      }
   }
}
