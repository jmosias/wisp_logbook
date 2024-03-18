export function middleware(request) {
  const jwt = request.cookies.get("jwt")?.value;

  if (!jwt && request.nextUrl.pathname.startsWith("/app")) {
    return Response.redirect(new URL("/login", request.url));
  }

  if (
    jwt &&
    (request.nextUrl.pathname === "/login" ||
      request.nextUrl.pathname === "/register" ||
      request.nextUrl.pathname === "/")
  ) {
    return Response.redirect(new URL("/app", request.url));
  }
}
