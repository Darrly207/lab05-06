// import { useEffect } from "react";
// import { useSelector } from "react-redux"; useRouter
import { usePathname } from "next/navigation";
// import type { RootState } from "@/store/store";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/" || pathname === "/register";

  return (
    <html lang="en">
      <body className={isLoginPage ? "full-screen" : ""}>
        {!isLoginPage && <Navbar />}
        <main>{children}</main>
        {!isLoginPage && <Footer />}
      </body>
    </html>
  );
}
