import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";
import { ProjectIdClient } from "./client";

interface ProjectIdPageProps {
  params: {
    projectId: string;
  };
}
const ProjectIdPage = async ({ params }: ProjectIdPageProps) => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  const { projectId } = await params;

  return <ProjectIdClient projectId={projectId} />;
};

export default ProjectIdPage;
