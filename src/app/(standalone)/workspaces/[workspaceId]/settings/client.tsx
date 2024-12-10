"use client";
import PageError from "@/components/page-error";
import PageLoader from "@/components/page-loader";
import { useGetSingleWorkspace } from "@/features/workspaces/api/use-get-single-workspace";
import { EditWorkspaceForm } from "@/features/workspaces/components/edit-workspace-form";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

export const WorkspaceIdSettingsClient = () => {
  const workspaceId = useWorkspaceId();
  const { data: initialValues, isLoading } = useGetSingleWorkspace({
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
      <EditWorkspaceForm initialValues={initialValues} />
    </div>
  );
};
