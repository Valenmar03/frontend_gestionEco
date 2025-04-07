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
   const [ subTotal, setSubTotal ] = useState(0)
   const [ total, setTotal ] = useState(0)

   const navigate = useNavigate()

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

      const newErrors: typeof emptyErrors = { ...emptyErrors };

      if (!client._id) newErrors.client = "Debe ingresar un cliente";
      if (dto >= 100 || dto < 0) newErrors.dto = "Revise el descuento";
      if (client.name === "Mercado Libre" && type !== "mercadoLibrePrice")
         newErrors.type = "El cliente es ML";
      if (client.name !== "Mercado Libre" && type === "mercadoLibrePrice")
         newErrors.type = "El cliente NO es ML";
      if (prodArray.find((prod) => prod.quantity <= 0))
         newErrors.product =
            "Los productos deben tener mas de 0 (cero) unidades";
      if (prodArray.length === 0)
         newErrors.product = "Debe ingresar al menos un producto";
      setErrors(newErrors);

      const areErrors = Object.values(newErrors).find((err) => err !== "");
      if (!areErrors) {
         try {
            const products = prodArray.map((prod) => {
               return {
                  product: prod.product._id,
                  quantity: prod.quantity,
                  unitPrice: prod.product.price[type],
               };
            });
            const sale = {
               type,
               client: client._id,
               products,
               iva,
               discount: dto,
            };
            const res = await createSale(sale);
            toast.success(res)
            navigate("/sales")
         } catch (error : any) {
            toast.error(error.message)
         }
      }
   };

   return (
      <>
         <form
            onSubmit={handleSubmit}
            className="grid grid-cols-6  bg-white px-20 pt-5 pb-10 rounded-lg shadow-md gap-10 mt-10 w-4/5 mx-auto"
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
            <div className="col-span-6 flex justify-between items-center gap-10 ">
               <div className="bg-gray-100 p-4 rounded-lg w-2/3">
                  <p className="text-xl">Subtotal: <span className="font-semibold">{formatCurrency(subTotal)}</span></p>
                  <p className="text-xl">Total: <span className="font-semibold">{formatCurrency(total)}</span></p>
               </div>
               <input
                  type="submit"
                  value="Crear Venta"
                  className="text-3xl bg-royal-purple-600 text-white font-semibold w-4/5 mx-auto p-2 rounded-md hover:bg-royal-purple-500 cursor-pointer duration-200"
               />
            </div>
         </form>
      </>
   );
}
