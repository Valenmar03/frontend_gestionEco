import { useForm } from "react-hook-form";

export default function LoginForm() {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm();
   return (
      <form className="space-y-8">
         <div className="flex flex-col space-y-2 w-2/3 mx-auto">
            <label htmlFor="name" className="text-2xl">
               Nombre de Usuario
            </label>
            <input
               type="text"
               id="name"
               className={`p-3 text-xl bg-gray-100 rounded outline-vida-loca-600`}
               placeholder="Nombre de Usuario"
            />
         </div>
         <div className="flex flex-col space-y-2 w-2/3 mx-auto">
            <label htmlFor="password" className="text-2xl">
               Contraseña
            </label>
            <input
               type="password"
               id="password"
               className={`p-3 text-xl bg-gray-100 rounded outline-vida-loca-600`}
               placeholder="Password"
            />
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
