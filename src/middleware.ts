export { auth as middleware } from "@/lib/auth";

export const config = {
  matcher: [
    "/((?!api/auth|file|login|error|next.svg|_next/static|_next/image|favicon.ico|robots.txt).*)",
  ],
};
