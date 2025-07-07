import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const res = await fetch(`${req.nextUrl.origin}/api/checkadmin`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log("esto es res");

  if (res.status !== 200) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  console.log("esto es res2 ");
  const data = await res.json();
   console.log(data)
  if (
    !data.user.roles.includes("user") &&
    req.nextUrl.pathname.startsWith("/admin")
  ) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
