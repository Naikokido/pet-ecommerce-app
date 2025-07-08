"use server";
import { revalidatePath } from "next/cache";

export async function deleteProduct(productId: number) {
  const url = `${process.env.API_URL}/products/${productId}`;
  const req = await fetch(url, {
    method: "DELETE",
  });

  if (!req.ok) {
    const data = await req.json();
    // Devuelve el error en vez de lanzar
    return { error: data.message || "No se pudo eliminar el producto" };
  }

  await req.json();
  revalidatePath("/admin/products");
  return { success: true };
}
