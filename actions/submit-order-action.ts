"use server";

import {
  ErrorResponseSchema,
  OrderSchema,
  SuccessResponseSchema,
} from "@/src/schemas";
import { revalidatePath, revalidateTag } from "next/cache";

export const submitOrder = async (data: unknown) => {
  const order = OrderSchema.parse(data);
  const url = `${process.env.API_URL}/transactions`;
  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(order),
  });

  const json = await req.json();
  if (!req.ok) {
    const errors = ErrorResponseSchema.parse(json);
    return {
      errors: errors.message.map((error) => error),
      success: "",
    };
  }

  const success = SuccessResponseSchema.parse(json);
  // revalidateTag("products-by-category");
  revalidatePath("/(store)/[categoryId]", "page");

  return {
    errors: [],
    success: success.message,
  };
};
