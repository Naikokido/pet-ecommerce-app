import { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const transactionDate = searchParams.get("transactionDate");

  const url = `${process.env.API_URL}/transactions?transactionDate=${transactionDate}`;
  const req = await fetch(url);
  const response = await req.json();

  return Response.json(response);
};
