import LoginForm from "../../components/Auth/LoginForm";

export default function LoginView() {
   return (
      <div className="bg-white p-5 mt-10 xl:mt-20 w-11/12 2xl:max-w-2/5 mx-auto rounded shadow-lg">
         <img src="/Logo.png" alt="Logo Ecorganico" className="w-18 mx-auto" />
         <h1 className="text-5xl text-center uppercase font-bold m-5 text-vida-loca-600">
            Inicia Sesión
         </h1>
         <LoginForm/>
      </div>
   );
}
