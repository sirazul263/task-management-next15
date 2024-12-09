import { z } from "zod";
import { TaskStatus } from "./types";

export const createTaskSchema = z.object({
  name: z.string().trim().min(1, "Name must be at lest 1 character"),
  status: z.nativeEnum(TaskStatus, { required_error: "Status is required" }),
  workspaceId: z
    .string()
    .trim()
    .min(1, "WorkspaceId must be at least 1 character"),
  projectId: z.string().trim().min(1, "ProjectId must be at least 1 character"),
  dueDate: z.coerce.date(),
  assigneeId: z.string().trim().min(1, "Assignee must be at least 1 character"),
  description: z.string().optional(),
});
