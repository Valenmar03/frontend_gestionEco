import { useState } from "react";
import SalesFormFields from "./SalesFormFields";
import SalesFormProds from "./SalesFormProds";
import { Client, Product } from "../../types";

type prodArrayType = {
   product: Product;
   quantity: number;
};

export default function SalesForm() {
   const [client, setClient] = useState<Client>({
      _id: "",
      name: "",
      phoneNumber: "",
      address: "",
      cuil: "",
   });
   const [iva, setIva] = useState(false);
   const [dto, setDto] = useState(0);
   const [type, setType] = useState("wholesalePrice");
   const [prodArray, setProdArray] = useState<prodArrayType[]>([]);
   const emptyErrors = {
      client: "",
      dto: "",
      type: "",
      product: "",
   };
   const [errors, setErrors] = useState(emptyErrors);

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const newErrors: typeof emptyErrors = { ...emptyErrors };

      if (!client._id)
         newErrors.client = "Debe ingresar un cliente"
      if (dto >= 100 || dto < 0)
         newErrors.dto = "Revise el descuento";
      if (client.name === "Mercado Libre" && type !== "MercadoLibrePrice")
         newErrors.type = "El cliente es ML";
      if (client.name !== "Mercado Libre" && type === "MercadoLibrePrice")
         newErrors. type = "El cliente NO es ML";
      if(prodArray.find(prod => prod.quantity <= 0))
         newErrors.product = "Los productos deben tener mas de 0 (cero) unidades"
      if(prodArray.length === 0)
         newErrors.product = "Debe ingresar al menos un producto"

      setErrors(newErrors);
   };

   return (
      <>
         <form
            onSubmit={handleSubmit}
            className="grid grid-cols-6  bg-white px-20 pt-5 pb-10 rounded-lg shadow-md gap-10 mt-10 w-4/5 mx-auto"
         >
            <h2 className="text-5xl col-span-6 mx-auto font-bold text-royal-purple-500">
               Agregar Venta
            </h2>
            <SalesFormFields
               setClient={setClient}
               setIva={setIva}
               setDto={setDto}
               setType={setType}
               errors={errors}
            />
            <SalesFormProds
               prodArray={prodArray}
               setProdArray={setProdArray}
               errors={errors}
            />
            <input
               type="submit"
               value="Crear Venta"
               className="col-span-6 text-3xl bg-royal-purple-600 text-white font-semibold w-4/5 mx-auto p-2 rounded-md hover:bg-royal-purple-500 cursor-pointer duration-200"
            />
         </form>
      </>
   );
}
