import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";
import { WorkspaceInviteCodeClient } from "./client";

const JoinWorkspacePage = async () => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");
  return <WorkspaceInviteCodeClient />;
};

export default JoinWorkspacePage;
