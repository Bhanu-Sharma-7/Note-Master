import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login", // Agar user login nahi hai, toh yaha redirect karega
  },
});

// Ye config batata hai ki kin-kin routes par protection chahiye
export const config = { 
  matcher: [
    "/dashboard/:path*", 
    "/profile/:path*", 
    "/trash/:path*", 
    "/settings/:path*"
  ] 
};