import Image from "next/image";
import Link from "next/link";
import { DottedSeparator } from "./dotted-separator";
import Navigation from "./navigation";
import { WorkspaceSwitcher } from "./workspace-switcher";
import { Projects } from "./projects";

const Sidebar = () => {
  return (
    <aside className="h-full bg-neutral-100 p-4 w-full">
      <Link href="/">
        <div className="flex items-center">
          <Image src={"/logo.svg"} width={36} height={36} alt="Logo" />
          <h2 className="text-2xl ml-2 font-bold">Jira</h2>
        </div>
      </Link>
      <DottedSeparator className="my-4" />
      <WorkspaceSwitcher />
      <DottedSeparator className="my-4" />
      <Navigation />
      <DottedSeparator className="my-4" />
      <Projects />
    </aside>
  );
};
export default Sidebar;
