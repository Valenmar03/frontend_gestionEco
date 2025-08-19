import { Product, SaleType } from "../../types";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../api/productAPI";
import { TrashIcon } from "@heroicons/react/20/solid";
import { formatCurrency } from "../../helpers";
import { useState } from "react";

type prodArrayType = { product: Product; quantity: number };
type SalesFormProdsProps = {
  prodArray: prodArrayType[];
  setProdArray: React.Dispatch<React.SetStateAction<prodArrayType[]>>;
  errors: { product: string };
  type: SaleType;
};

export default function SalesFormProds({ prodArray, setProdArray, errors, type }: SalesFormProdsProps) {
  const { data: products } = useQuery({ queryKey: ["products"], queryFn: getProducts });
  const [search, setSearch] = useState("");

  const handleAddProduct = (id: Product["_id"]) => {
    const isAlready = prodArray.find((p) => p.product._id === id);
    if (isAlready) { setProdArray(prodArray.filter((p) => p.product._id !== id)); return; }
    const found = products?.find((p) => p._id === id);
    if (found) setProdArray([...prodArray, { product: found, quantity: 0 }]);
  };

  const handleChangeQty = (id: Product["_id"], qty: number) => {
    if (qty < 0) return;
    setProdArray(prodArray.map((p) => (p.product._id === id ? { ...p, quantity: qty } : p)));
  };

  const handleDelete = (id: Product["_id"]) => {
    setProdArray(prodArray.filter((p) => p.product._id !== id));
  };

  const filteredProducts = products?.filter((p) =>
    `${p.type} ${p.weight}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="flex flex-col space-y-3">
        <h3 className="text-lg sm:text-xl font-semibold">Productos Seleccionados</h3>

        <div className="bg-gray-200/50 rounded-lg text-base sm:text-lg max-h-[260px] overflow-y-auto shadow-inner">
          {prodArray.length === 0 ? (
            <p className={`text-center p-4 text-gray-500 ${errors.product ? "border-l-4 border-red-500" : ""}`}>
              Aún no hay productos agregados.
            </p>
          ) : (
            prodArray.map(({ product, quantity }) => (
              <div
                key={product._id}
                className={`grid grid-cols-2 md:grid-cols-8 items-center gap-3 border-t border-gray-300 py-2 px-3 ${
                  errors.product && quantity === 0 ? "border-l-4 border-red-500" : ""
                }`}
              >
                <p className="col-span-2 md:col-span-3 text-center md:text-left">
                  {`${product.type} x ${product.weight}${product.haveWeight ? "Kg." : "mL."}`}
                </p>

                {/* Precio: visible en desktop; en mobile va debajo del nombre */}
                <p className="hidden md:block md:col-span-2 text-center">
                  {formatCurrency(product.revenuePercentage[type] * product.cost + product.cost)}
                </p>
                <p className="md:hidden col-span-2 text-center text-sm text-gray-600 -mt-2">
                  {formatCurrency(product.revenuePercentage[type] * product.cost + product.cost)}
                </p>

                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => handleChangeQty(product._id, Number(e.target.value))}
                  className="col-span-1 md:col-span-2 text-center bg-white rounded-md p-2 border border-gray-300"
                />
                <TrashIcon
                  className="col-span-1 size-5 mx-auto text-red-500 hover:scale-110 transition cursor-pointer"
                  onClick={() => handleDelete(product._id)}
                />
              </div>
            ))
          )}
        </div>

        {errors.product && <p className="text-sm sm:text-base text-red-500">{errors.product}</p>}
      </div>

      <div className="flex flex-col space-y-3">
        <h3 className="text-lg sm:text-xl font-semibold">Agregar Productos</h3>

        <input
          type="text"
          placeholder="Buscar por tipo o peso..."
          className="p-3 rounded-md border border-gray-300 bg-white text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-royal-purple-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="bg-gray-200/50 rounded-lg text-base sm:text-lg max-h-[260px] overflow-y-auto shadow-inner">
          {filteredProducts?.map((product) => {
            const isSelected = prodArray.some((p) => p.product._id === product._id);
            const stateClasses =
              product.stock > 0
                ? isSelected
                  ? "bg-vida-loca-500/60 hover:bg-vida-loca-500/80 font-medium"
                  : "hover:bg-gray-300"
                : "bg-red-300/80 hover:bg-red-500/80 font-medium";

            return (
              <p
                key={product._id}
                onClick={() => handleAddProduct(product._id)}
                className={`text-center py-2 px-3 border-t border-gray-300 cursor-pointer transition duration-200 ${stateClasses}`}
              >
                {`${product.type} x ${product.weight}${product.haveWeight ? "Kg." : "mL."} (${product.stock})`}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}
