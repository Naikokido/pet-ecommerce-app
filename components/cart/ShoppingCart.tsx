"use client";

import { useStore } from "@/src/store";
import ShoppingCartItem from "./ShoppingCartItem";
import Amount from "./Amount";
import CouponForm from "./CouponForm";
import SubmitOrderForm from "./SubmitOrderForm";

const ShoppingCart = () => {
  const contents = useStore((state) => state.contents);
  const total = useStore((state) => state.total);
  const discount = useStore((state) => state.discount);
  const orderConfirmed = useStore((state) => state.orderConfirmed);
  const setOrderConfirmed = useStore((state) => state.setOrderConfirmed);

  return (
    <>
      {orderConfirmed ? (
        <div className="text-center space-y-4">
          <p className="text-2xl font-bold text-green-600">
            ✅ ¡Tu compra fue realizada con éxito!
          </p>
          <button
            onClick={() => setOrderConfirmed(false)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
          >
            ❌ Cerrar
          </button>
        </div>
      ) : contents.length ? (
        <>
          <h2 className="text-4xl font-bold text-gray-900">Resumen de venta</h2>

          <ul
            role="list"
            className="mt-6 divide-y divide-gray-2 border-t border-gray-200 text-sm font-medium text-gray-500"
          >
            {contents.map((item) => (
              <ShoppingCartItem key={item.productId} item={item} />
            ))}
          </ul>
          <dl className="space-y-6 border-t border-gray-300 py-6 text-sm font-medium text-gray-500">
            {discount ? (
              <Amount label="Descuento: " amount={discount} discount={true} />
            ) : null}

            <Amount label="Total a Pagar: " amount={total} />
          </dl>
          <CouponForm />
          <SubmitOrderForm />
        </>
      ) : (
        <p className="text-xl text-center text-gray-900">
          El carrito está vacío
        </p>
      )}
    </>
  );
};

export default ShoppingCart;
