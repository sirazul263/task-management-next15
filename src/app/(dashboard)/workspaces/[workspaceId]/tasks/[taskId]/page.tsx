import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";
import { TaskClient } from "./client";
const TaskIdPage = async () => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  return (
    <div className="h-full flex-col">
      <TaskClient />
    </div>
  );
};

export default TaskIdPage;
