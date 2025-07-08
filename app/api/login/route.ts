import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();

  const backendRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await backendRes.json();

  if (!backendRes.ok) {
    return NextResponse.json(data, { status: backendRes.status });
  }

  // crea cookie legible para el cliente y middleware
  const response = NextResponse.json(data, { status: 200 });
  response.cookies.set('token', data.token, {
    httpOnly: false,
    path: '/',
    maxAge: 60 * 60 * 24,
  });

  return response;
}
