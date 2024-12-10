import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";
import { ProjectIdSettingClient } from "./client";
interface ProjectIdSettingsPageProps {
  params: {
    projectId: string;
  };
}
const WorkspaceIdSettingsPage = async ({
  params,
}: ProjectIdSettingsPageProps) => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");
  const { projectId } = await params;

  return <ProjectIdSettingClient projectId={projectId} />;
};

export default WorkspaceIdSettingsPage;
