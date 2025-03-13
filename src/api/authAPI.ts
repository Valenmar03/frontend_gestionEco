import { isAxiosError } from "axios";
import api from "../lib/axios";
import { User, UserLoginForm, userSchema } from "../types";

export async function authenticateUser(formData: UserLoginForm) {
   try {
      const url = "/auth/login";
      const { data } = await api.post(url, formData);
      localStorage.setItem("AUTH_TOKEN", data.token);
      return data;
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data);
      }
   }
}

export async function getUser() {
   try {
      const { data } = await api<User>("/auth/user");
      const response = userSchema.safeParse(data);
      console.log(response);
      if (response.success) return response.data;
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data);
      }
   }
}
