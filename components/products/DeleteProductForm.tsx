"use client";
import { deleteProduct } from "@/actions/delete-product-action";
import { Product } from "@/src/schemas";
import { useState } from "react";
import { toast } from "react-toastify";

export default function DeleteProductForm({
  productId,
}: {
  productId: Product["id"];
}) {
  const [error, setError] = useState<string | null>(null);

  const handleDeleteProduct = async () => {
    setError(null);
    const result = await deleteProduct(productId);
    if (result?.error) {
      setError(result.error);
      toast.error(result.error);
    } else {
      toast.success("Producto eliminado correctamente");
    }
  };

  return (
    <form
      action={async () => {
        await handleDeleteProduct();
      }}
    >
      <input
        type="submit"
        className="text-red-600 hover:text-red-800 cursor-pointer"
        value="Eliminar"
      />
      {error && <div className="text-red-600 text-xs mt-1">{error}</div>}
    </form>
  );
}
