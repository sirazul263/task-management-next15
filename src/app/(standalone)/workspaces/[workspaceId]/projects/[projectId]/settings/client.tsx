"use client";

import PageError from "@/components/page-error";
import PageLoader from "@/components/page-loader";
import { useGetSingleProject } from "@/features/projects/api/use-get-single-project";
import { EditProjectForm } from "@/features/projects/components/edit-project-form";
import { useProjectId } from "@/features/projects/hooks/use-project-id";

export const ProjectIdSettingClient = () => {
  const projectId = useProjectId();
  const { data, isLoading } = useGetSingleProject({ projectId });

  if (isLoading) {
    return <PageLoader />;
  }
  if (!data) {
    return <PageError message={"Project not found!"} />;
  }

  return (
    <div className="w-full lg:max-w-xl">
      <EditProjectForm initialValues={data} />
    </div>
  );
};
