"use client";

import PageError from "@/components/page-error";
import PageLoader from "@/components/page-loader";
import { useGetSingleProject } from "@/features/projects/api/use-get-single-project";
import { EditProjectForm } from "@/features/projects/components/edit-project-form";

export const ProjectIdSettingClient = ({
  projectId,
}: {
  projectId: string;
}) => {
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
