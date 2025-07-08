import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const backendRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );

  const data = await backendRes.json();

  if (!backendRes.ok) {
    return NextResponse.json(data, { status: backendRes.status });
  }

  // Creamos una cookie legible para el navegador y el middleware
  const response = NextResponse.json(data, { status: backendRes.status });
  response.cookies.set({
    name: "token",
    value: data.token,
    httpOnly: false,
    sameSite: "lax",
    secure: false,
    path: "/",
    maxAge: 60 * 60 * 24, // 1 día
  });

  return response;
}
