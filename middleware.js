import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/protected-route", // Define the specific protected routes here
  "/another-protected-route",
]);

export default clerkMiddleware((auth, req) => {
  // Skip authentication for unprotected routes
  if (!isProtectedRoute(req)) {
    return NextResponse.next();
  }

  // If the route matches a protected route, Clerk will handle the authentication
  return;
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
