"use client";

import PageError from "@/components/page-error";
import PageLoader from "@/components/page-loader";
import { useGetSingleTask } from "@/features/tasks/api/use-get-single-task";
import { TaskBreadcrumbs } from "@/features/tasks/components/task-breadcrumbs";

export const TaskClient = ({ taskId }: { taskId: string }) => {
  const { data, isLoading } = useGetSingleTask({ taskId });

  if (isLoading) {
    return <PageLoader />;
  }

  if (!data) {
    return <PageError message={"Task not found!"} />;
  }
  return (
    <div className="flex flex-col ">
      <TaskBreadcrumbs project={data.project} task={data} />
    </div>
  );
};
