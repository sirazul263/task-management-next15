import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";

const WorkspaceIdPage = async () => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  return <div className="bg-neutral-500 p-4 h-full"></div>;
};

export default WorkspaceIdPage;
