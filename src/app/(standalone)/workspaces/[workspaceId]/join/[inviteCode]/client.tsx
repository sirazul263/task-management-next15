import PageError from "@/components/page-error";
import PageLoader from "@/components/page-loader";
import { useGetWorkspaceInfo } from "@/features/workspaces/api/use-get-workspace-info";
import { JoinWorkspaceForm } from "@/features/workspaces/components/join-workspace-form";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

interface WorkspaceInviteCodeClientProps {
  inviteCode: string;
}
export const WorkspaceInviteCodeClient = ({
  inviteCode,
}: WorkspaceInviteCodeClientProps) => {
  const workspaceId = useWorkspaceId();
  const { data: initialValues, isLoading } = useGetWorkspaceInfo({
    workspaceId,
  });
  if (isLoading) {
    return <PageLoader />;
  }
  if (!initialValues) {
    return <PageError message={"Failed to get the workspace"} />;
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
