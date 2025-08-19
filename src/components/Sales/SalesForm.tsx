import { useEffect, useState } from "react";
import SalesFormFields from "./SalesFormFields";
import SalesFormProds from "./SalesFormProds";
import { Client, Product, SaleType } from "../../types";
import { createSale } from "../../api/SalesAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../helpers";

type prodArrayType = { product: Product; quantity: number };

export default function SalesForm() {
  const [client, setClient] = useState<Client>({
    _id: "", name: "", phoneNumber: "", address: "", cuil: "", cp: "", province: "", city: "",
  });
  const [iva, setIva] = useState(false);
  const [dto, setDto] = useState(0);
  const [type, setType] = useState<SaleType>("wholesale");
  const [prodArray, setProdArray] = useState<prodArrayType[]>([]);

  const emptyErrors = { client: "", dto: "", type: "", product: "" };
  const [errors, setErrors] = useState(emptyErrors);
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const subtotal = prodArray.reduce((acc, p) =>
      acc + (p.product.revenuePercentage[type] * p.product.cost + p.product.cost) * p.quantity
    , 0);
    setSubTotal(subtotal);
    const discount = (subtotal * dto) / 100;
    const t = subtotal - discount;
    setTotal(iva ? t * 1.21 : t);
  }, [iva, dto, type, prodArray]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = { ...emptyErrors };

    if (!client._id) newErrors.client = "Debe ingresar un cliente";
    if (dto >= 100 || dto < 0) newErrors.dto = "Revise el descuento";
    if (client.name === "Mercado Libre" && type !== "mercadoLibre") newErrors.type = "El cliente es Mercado Libre";
    if (client.name !== "Mercado Libre" && type === "mercadoLibre") newErrors.type = "El cliente NO es Mercado Libre";
    if (prodArray.find((p) => p.quantity <= 0)) newErrors.product = "Los productos deben tener más de 0 unidades";
    if (prodArray.length === 0) newErrors.product = "Debe ingresar al menos un producto";

    setErrors(newErrors);
    const hasErrors = Object.values(newErrors).some(Boolean);
    if (hasErrors) return;

    try {
      const products = prodArray.map((p) => ({
        product: p.product._id,
        quantity: p.quantity,
        unitPrice: p.product.revenuePercentage[type] * p.product.cost + p.product.cost,
      }));
      const sale = {
        type,
        client: {
          _id: client._id, name: client.name, phoneNumber: client.phoneNumber, address: client.address,
          cuil: client.cuil, cp: client.cp, province: client.province, city: client.city,
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
  };

  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      className="
        grid gap-6 grid-cols-1 xl:grid-cols-12
        bg-white rounded-lg shadow-md w-11/12 mx-auto mt-10
        px-4 py-5 sm:px-6 sm:py-7 lg:px-10 lg:py-10
      "
    >
      {/* FILA 1: Campos (izq) */}
      <div className="md:col-span-12">
        <SalesFormFields
          setClient={setClient}
          setIva={setIva}
          setDto={setDto}
          setType={setType}
          errors={errors}
        />
      </div>

      {/* FILA 1: (espacio para que IVA/DTO/Tipo queden a la derecha) */}
      <div className="md:col-span-6" />

      {/* FILA 2: Productos (seleccionados / agregar) */}
      <div className="md:col-span-12">
        <SalesFormProds
          prodArray={prodArray}
          setProdArray={setProdArray}
          errors={errors}
          type={type}
        />
      </div>

      {/* FILA 3: Totales (izq) */}
      <div className="md:col-span-6">
        <aside className="bg-gray-100 p-4 rounded-lg">
          <p className="text-lg sm:text-xl">
            Subtotal: <span className="font-semibold">{formatCurrency(subTotal)}</span>
          </p>
          <p className="text-lg sm:text-xl">
            Total: <span className="font-semibold">{formatCurrency(total)}</span>
          </p>
          {iva && <p className="text-xs sm:text-sm text-gray-500 mt-1 italic">* Incluye IVA (21%)</p>}
          {dto > 0 && <p className="text-xs sm:text-sm text-gray-500 italic">* Descuento aplicado: {dto}%</p>}
          {errors.product && <p className="text-sm text-red-500 mt-2">{errors.product}</p>}
        </aside>
      </div>

      {/* FILA 3: CTA (der) */}
      <div className="md:col-span-6 flex md:justify-end items-center">
        <input
          type="submit"
          value="Crear Venta"
          className="
            w-full md:w-auto
            text-xl sm:text-2xl
            bg-royal-purple-600 text-white font-semibold
            px-6 sm:px-10 py-3 rounded-md
            hover:bg-royal-purple-500 transition
          "
        />
      </div>
    </form>
  );
}
