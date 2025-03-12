import { isAxiosError } from "axios";
import api from "../lib/axios";
import { UserLoginForm } from "../types";

export async function authenticateUser(formData: UserLoginForm) {
   try {
      const url = "/auth/login";
      const { data } = await api.post(url, formData);
      return data;
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data);
      }
   }
}
