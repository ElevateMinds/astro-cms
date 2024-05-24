import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

export function middleware(request: NextRequest) 
{
  const token = cookies().get("jwt_token");
  console.log(token)
  if (!token) {
    return NextResponse.redirect(new URL('/', request.url))
  }
  return NextResponse.next();
}
export const config = {
  matcher: '/dashboard',
}