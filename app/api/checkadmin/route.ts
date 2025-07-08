import { NextResponse } from "next/server";

export async function GET(req: Request) {
  // 🔷 Leer token de la cookie legible
  const cookieHeader = req.headers.get("Authorization") || "";
  const token = cookieHeader.split(" ")[1];

  if (!token) {
    return NextResponse.json(
      { message: "No token found", error: "Unauthorized" },
      { status: 401 }
    );
  }

  const backendRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/private3`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log("Status:", backendRes.status);
  const data = await backendRes.json();

  if (backendRes.status !== 200) {
    return NextResponse.json(data, { status: backendRes.status });
  }

  return NextResponse.json(data, { status: 200 });
}
