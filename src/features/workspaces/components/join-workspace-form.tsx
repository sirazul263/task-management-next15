"use client";

import { DottedSeparator } from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useJoinWorkspace } from "../api/use-join-workspace";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface JoinWorkspaceFormProps {
  initialValues: {
    name: string;
  };
  inviteCode: string;
  workspaceId: string;
}
export const JoinWorkspaceForm = ({
  initialValues,
  inviteCode,
  workspaceId,
}: JoinWorkspaceFormProps) => {
  const router = useRouter();
  const { mutate, isPending } = useJoinWorkspace();

  const onSubmit = () => {
    mutate(
      {
        param: { workspaceId: workspaceId },
        json: {
          code: inviteCode,
        },
      },
      {
        onSuccess: ({ data }) => {
          // Redirect to workspace page
          toast.success("Successfully joined workspace");
          router.push(`/workspaces/${data.$id}`);
        },
      }
    );
  };

  return (
    <Card className="w-full h-full shadow-none border-none">
      <CardHeader className="p-7">
        <CardTitle className="text-xl font-bold">Join Workspace</CardTitle>
        <CardDescription>
          You&apos;ve been invited to join{" "}
          <strong>{initialValues.name} </strong> workspace.
        </CardDescription>
      </CardHeader>
      <div className="px-7 ">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        <div className="flex flex-col lg:flex-row gap-2 items-center justify-between">
          <Button
            className="w-full lg:w-fit"
            size="lg"
            type="button"
            variant="secondary"
            asChild
            disabled={isPending}
          >
            <Link href="/"> Cancel</Link>
          </Button>
          <Button
            size="lg"
            type="button"
            disabled={isPending}
            className="w-full lg:w-fit"
            onClick={onSubmit}
          >
            Join Workspace
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
