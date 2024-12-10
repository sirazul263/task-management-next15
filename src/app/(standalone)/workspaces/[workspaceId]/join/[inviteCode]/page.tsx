import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";
import { WorkspaceInviteCodeClient } from "./client";
interface JoinWorkspacePageProps {
  param: {
    inviteCode: string;
  };
}
const JoinWorkspacePage = async ({ param }: JoinWorkspacePageProps) => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  const { inviteCode } = await param;

  return <WorkspaceInviteCodeClient inviteCode={inviteCode} />;
};

export default JoinWorkspacePage;
