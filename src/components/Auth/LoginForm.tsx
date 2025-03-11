import { useForm } from "react-hook-form";
import { UserLoginForm } from "../../types";

export default function LoginForm() {
   const initialValues: UserLoginForm = {
      userName: "",
      password: "",
   };

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({ defaultValues: initialValues });

   const handleForm = () => {};

   return (
      <form className="space-y-8" onSubmit={handleSubmit(handleForm)}>
         <div className="flex flex-col space-y-2 w-2/3 mx-auto">
            <label htmlFor="name" className="text-2xl">
               Nombre de Usuario
            </label>
            <div>
               <input
                  type="text"
                  id="name"
                  className={`p-3 text-xl bg-gray-100 w-full rounded outline-vida-loca-600
                    ${errors.userName ? "border-l-4 border-red-600" : ""}`}
                  placeholder="Nombre de Usuario"
                  {...register("userName", {
                     required: "Ingrese su nombre de usuario",
                  })}
               />
               {errors.userName && (
                  <p className="text-lg text-red-500">
                     {errors.userName.message}
                  </p>
               )}
            </div>
         </div>
         <div className="flex flex-col space-y-2 w-2/3 mx-auto">
            <label htmlFor="password" className="text-2xl">
               Contraseña
            </label>
            <div>
               <input
                  type="password"
                  id="password"
                  className={`p-3 text-xl bg-gray-100 w-full rounded outline-vida-loca-600
                    ${errors.password ? "border-l-4 border-red-600" : ""}`}
                  placeholder="Password"
                  {...register("password", {
                     required: "Ingrese su contraseña",
                  })}
               />
               {errors.password && (
                  <p className="text-lg text-red-500">
                     {errors.password.message}
                  </p>
               )}
            </div>
         </div>
         <div className="w-2/3 mx-auto">
            <input
               type="submit"
               value="Iniciar Sesión"
               className="bg-vida-loca-600 hover:bg-vida-loca-600  text-white w-full  rounded-md p-3 mt-3 mb-5 text-2xl font-bold cursor-pointer duration-200"
            />
         </div>
      </form>
   );
}
