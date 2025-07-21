import { useEffect, useState } from "react";
import SalesFormFields from "./SalesFormFields";
import SalesFormProds from "./SalesFormProds";
import { Client, Product, SaleType } from "../../types";
import { createSale } from "../../api/SalesAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../helpers";

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
      cp:"",
      province: "",
      city: ""
   });
   const [iva, setIva] = useState(false);
   const [dto, setDto] = useState(0);
   const [type, setType] = useState<SaleType>("wholesalePrice");
   const [prodArray, setProdArray] = useState<prodArrayType[]>([]);

   const emptyErrors = {
      client: "",
      dto: "",
      type: "",
      product: "",
   };
   const [errors, setErrors] = useState(emptyErrors);
   const [subTotal, setSubTotal] = useState(0);
   const [total, setTotal] = useState(0);

   const navigate = useNavigate();

   useEffect(() => {
      const subtotal = prodArray.reduce((acc, prod) => {
         return acc + prod.product.price[type] * prod.quantity;
      }, 0);
      setSubTotal(subtotal);
      const discount = (subtotal * dto) / 100;
      const total = subtotal - discount;
      setTotal(iva ? total * 1.21 : total);
   }, [iva, dto, type, prodArray]);

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const newErrors = { ...emptyErrors };

      if (!client._id) newErrors.client = "Debe ingresar un cliente";
      if (dto >= 100 || dto < 0) newErrors.dto = "Revise el descuento";
      if (client.name === "Mercado Libre" && type !== "mercadoLibrePrice")
         newErrors.type = "El cliente es Mercado Libre";
      if (client.name !== "Mercado Libre" && type === "mercadoLibrePrice")
         newErrors.type = "El cliente NO es Mercado Libre";
      if (prodArray.find((prod) => prod.quantity <= 0))
         newErrors.product = "Los productos deben tener más de 0 unidades";
      if (prodArray.length === 0)
         newErrors.product = "Debe ingresar al menos un producto";

      setErrors(newErrors);

      const hasErrors = Object.values(newErrors).some(Boolean);
      if (!hasErrors) {
         try {
            const products = prodArray.map((prod) => ({
               product: prod.product._id,
               quantity: prod.quantity,
               unitPrice: prod.product.price[type],
            }));
            const sale = {
               type,
               client:{
                  _id: client._id,
                  name: client.name
               },
               products,
               iva,
               discount: dto,
            };
            const res = await createSale(sale);
            toast.success(res);
            navigate("/sales");
         } catch (error: any) {
            toast.error(error.message);
         }
      }
   };

   return (
      <form
         onSubmit={handleSubmit}
         autoComplete="off"
         className="grid grid-cols-6 gap-10 bg-white px-10 pt-5 pb-10 rounded-lg shadow-md w-11/12 mx-auto mt-10"
      >
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
            type={type}
         />

         <div className="col-span-6 flex flex-col md:flex-row justify-between items-center gap-6 mt-4">
            <aside className="bg-gray-100 p-4 rounded-lg w-full md:w-1/2">
               <p className="text-xl">
                  Subtotal:{" "}
                  <span className="font-semibold">
                     {formatCurrency(subTotal)}
                  </span>
               </p>
               <p className="text-xl">
                  Total:{" "}
                  <span className="font-semibold">
                     {formatCurrency(total)}
                  </span>
               </p>
               {iva && (
                  <p className="text-sm text-gray-500 mt-1 italic">
                     * Incluye IVA (21%)
                  </p>
               )}
               {dto > 0 && (
                  <p className="text-sm text-gray-500 italic">
                     * Descuento aplicado: {dto}%
                  </p>
               )}
            </aside>

            <input
               type="submit"
               value="Crear Venta"
               className="text-2xl bg-royal-purple-600 text-white font-semibold px-10 py-3 rounded-md hover:bg-royal-purple-500 transition duration-200 w-full md:w-auto"
            />
         </div>
      </form>
   );
}
