"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface AuthLayoutProps {
  children: React.ReactNode;
}
const AuthLayout = ({ children }: AuthLayoutProps) => {
  const pathname = usePathname();
  return (
    <main className="bg-neutral-100 min-h-screen">
      <div className="mx-auto max-w-screen-2xl p-4">
        <nav className="flex justify-between items-center">
          <div className="flex items-center">
            <Image src="/logo.svg" height={40} width={40} alt="Logo" />{" "}
            <p className="ms-1">Jira</p>
          </div>
          <Button asChild variant="secondary">
            <Link href={pathname == "/sign-in" ? "/sign-up" : "/sign-in"}>
              {pathname == "/sign-in" ? "Sign Up" : "Login"}
            </Link>
          </Button>
        </nav>
        <div className="flex flex-col items-center justify-center pt-4 md:pt-14">
          {children}
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
