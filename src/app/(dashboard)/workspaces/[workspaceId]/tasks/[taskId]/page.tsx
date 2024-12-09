import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";
import { TaskClient } from "./client";

interface ProjectIdSettingsPageProps {
  params: {
    taskId: string;
  };
}

const TaskIdPage = async ({ params }: ProjectIdSettingsPageProps) => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  const { taskId } = await params;

  return (
    <div className="h-full flex-col">
      <TaskClient taskId={taskId} />
    </div>
  );
};

export default TaskIdPage;
