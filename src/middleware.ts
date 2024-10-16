import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose"; // Import jwtVerify from jose
import { JwtPayload } from "jsonwebtoken"; // For type safety

const roleBasedPaths = {
  admin: [
    "/adminDashboard",
    "/",
    "/adminDashboard/user",
    "/adminDashboard/post",
    "/adminDashboard/payment",
    "/about",
    "/contact",
  ],
  user: [
    "/userProfile/profile",
    "/userProfile/editProfile",
    "/",
    "/settings",
    "/postDetails/:postId",
  ],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log(pathname);
  // Add routes that don't require authentication
  const publicRoutes = ["/login", "/signup"];

  // Skip authentication for public routes
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get("token")?.value;
  if (!token) {
    console.log("no token");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    // Decode the JWT token to extract the role using jose
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET_KEY)
    );

    const { role } = payload as JwtPayload; // Use payload to extract role

    if (role === "admin" && roleBasedPaths.admin.includes(pathname)) {
      return NextResponse.next();
    } else if (role === "user" && roleBasedPaths.user.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  } catch (error) {
    console.log("error", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/", "/userProfile/:path*", "/adminDashboard/:path*"],
};
