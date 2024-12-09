import { getCurrent } from "@/features/auth/queries";
import { JoinWorkspaceForm } from "@/features/workspaces/components/join-workspace-form";
import { getWorkSpaceInfo } from "@/features/workspaces/queries";
import { redirect } from "next/navigation";
interface JoinWorkspacePageProps {
  params: {
    workspaceId: string;
    inviteCode: string;
  };
}
const JoinWorkspacePage = async ({ params }: JoinWorkspacePageProps) => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  const { workspaceId, inviteCode } = await params;
  const initialValues = await getWorkSpaceInfo({ workspaceId });
  if (!initialValues) {
    redirect(`/`);
  }

  return (
    <div className="w-full lg:max-w-xl">
      <JoinWorkspaceForm
        initialValues={initialValues}
        inviteCode={inviteCode}
        workspaceId={workspaceId}
      />
    </div>
  );
};

export default JoinWorkspacePage;
