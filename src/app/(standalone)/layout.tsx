import { UserButton } from "@/features/auth/components/user-button";
import Image from "next/image";
import Link from "next/link";

interface StandAloneLayoutProps {
  children: React.ReactNode;
}
const StandAloneLayout = ({ children }: StandAloneLayoutProps) => {
  return (
    <main className="bg-neutral-100 min-h-screen">
      <div className="mx-auto max-w-screen-2xl p-4">
        <nav className="flex justify-between items-center h-[73px]">
          <Link href="/">
            <div className="flex items-center">
              <Image src={"/logo.svg"} width={36} height={36} alt="Logo" />
              <h2 className="text-2xl ml-2 font-bold">Jira</h2>
            </div>
          </Link>
          <UserButton />
        </nav>
        <div className="flex flex-col justify-center items-center py-4">
          {children}
        </div>
      </div>
    </main>
  );
};

export default StandAloneLayout;
