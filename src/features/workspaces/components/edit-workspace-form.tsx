"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DottedSeparator } from "@/components/dotted-separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import { ArrowLeftIcon, CopyIcon, DeleteIcon, ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { updateWorkspaceSchema } from "../schemas";
import { Workspace } from "../types";
import { useUpdateWorkSpace } from "../api/use-update-workspace";
import { useConfirm } from "../../../hooks/use-confirm";
import { useDeleteWorkSpace } from "../api/use-delete-workspace";
import { toast } from "sonner";
import { useResetInviteCode } from "../api/use-reset-invite-code";

interface EditWorkspaceFormPros {
  onCancel?: () => void;
  initialValues: Workspace;
}

export const EditWorkspaceForm = ({
  onCancel,
  initialValues,
}: EditWorkspaceFormPros) => {
  const router = useRouter();
  const { mutate, isPending } = useUpdateWorkSpace();

  const { mutate: deleteMutation, isPending: isDeletingWorkspace } =
    useDeleteWorkSpace();

  const [DeleteDialog, confirmDelete] = useConfirm(
    "Delete Workspace",
    "This action can't be undone",
    "destructive"
  );

  const { mutate: resetInviteLink, isPending: isResettingInviteLink } =
    useResetInviteCode();

  const [ResetDialog, confirmReset] = useConfirm(
    "Reset Invite Link",
    "Are you sure you want to reset the invite link?",
    "destructive"
  );

  const inputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof updateWorkspaceSchema>>({
    resolver: zodResolver(updateWorkspaceSchema),
    defaultValues: {
      ...initialValues,
      image: initialValues.imageUrl ?? "",
    },
  });

  //Delete the workspace
  const handleDelete = async () => {
    const ok = await confirmDelete();
    if (!ok) return;
    deleteMutation(
      { param: { workspaceId: initialValues.$id } },
      {
        onSuccess: () => {
          router.push("/");
          window.location.href = "/";
        },
      }
    );
  };

  //Reset the invite link
  const handleResetInviteLink = async () => {
    const ok = await confirmReset();
    if (!ok) return;
    resetInviteLink(
      { param: { workspaceId: initialValues.$id } },
      {
        onSuccess: () => {
          router.refresh();
        },
      }
    );
  };

  //Update the workspace
  const onSubmit = (values: z.infer<typeof updateWorkspaceSchema>) => {
    const finalValues = {
      ...values,
      image: values.image instanceof File ? values.image : "",
    };
    mutate(
      { form: finalValues, param: { workspaceId: initialValues.$id } },
      {
        onSuccess: ({ data }) => {
          form.reset();
          router.push(`/workspaces/${data.$id}`);
        },
      }
    );
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("image", file);
    }
  };

  const fullInviteLink = `${window.location.origin}/workspaces/${initialValues.$id}/join/${initialValues.inviteCode}`;

  const handleCopyInviteLink = () => {
    navigator.clipboard.writeText(fullInviteLink).then(() => {
      toast.success(`Invite link copied successfully`);
    });
  };
  return (
    <div className="flex flex-col gap-y-4">
      <DeleteDialog />
      <ResetDialog />

      <Card className="w-full h-full  border-none shadow-none">
        <CardHeader className="flex flex-row  items-center gap-x-4 p-7 space-y-0">
          <Button
            size="sm"
            type="button"
            variant="secondary"
            onClick={
              onCancel
                ? onCancel
                : () => router.push(`/workspaces/${initialValues.$id}`)
            }
          >
            <ArrowLeftIcon className="size-4 mr-2" />
            Back
          </Button>
          <CardTitle className="text-xl font-bold">
            {initialValues.name}
          </CardTitle>
        </CardHeader>
        <div className="px-7 ">
          <DottedSeparator />
        </div>
        <CardContent className="p-7">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex flex-col gap-y-4">
                <FormField
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Workspace Name <span className="text-red-700">*</span>{" "}
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder="Enter workspace name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="image"
                  control={form.control}
                  render={({ field }) => (
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-x-5">
                        {field.value ? (
                          <div className="size-[72px] relative rounded-md overflow-hidden">
                            <Image
                              src={
                                field.value instanceof File
                                  ? URL.createObjectURL(field.value)
                                  : field.value
                              }
                              fill
                              className="object-cover"
                              alt="Image"
                            />
                          </div>
                        ) : (
                          <Avatar className="size-[72px]">
                            <AvatarFallback>
                              <ImageIcon className="size-[36px] text-neutral-400" />
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div className="flex flex-col ">
                          <p className="text-sm">Workspace Icon</p>
                          <p className="text-sm text-muted-foreground">
                            JPG, PNG,SVG or JPEG, , max 1MB
                          </p>
                          <input
                            type="file"
                            className="hidden"
                            accept=".jpg, .png, .svg, .jpeg"
                            ref={inputRef}
                            disabled={isPending}
                            onChange={handleImageChange}
                          />
                          {field.value ? (
                            <Button
                              type="button"
                              disabled={isPending}
                              variant="destructive"
                              size="xs"
                              className="w-fit mt-2"
                              onClick={() => {
                                field.onChange(null);
                                if (inputRef.current) {
                                  inputRef.current.value = "";
                                }
                              }}
                            >
                              Remove Image
                            </Button>
                          ) : (
                            <Button
                              type="button"
                              disabled={isPending}
                              variant="teritary"
                              size="xs"
                              className="w-fit mt-2"
                              onClick={() => inputRef.current?.click()}
                            >
                              Upload Image
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                />
              </div>

              <DottedSeparator className="py-7" />
              <div className="flex items-center justify-between">
                <Button
                  type="button"
                  size="lg"
                  variant="secondary"
                  onClick={onCancel}
                  disabled={isPending}
                  className={cn(!onCancel && "invisible")}
                >
                  Cancel
                </Button>
                <Button type="submit" size="lg" disabled={isPending}>
                  Save Changes
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Card className="w-full h-full  border-none shadow-none">
        <CardContent className="p-7">
          <div className="flex flex-col ">
            <h3 className="font-bold">Invite Member</h3>
            <p className="text-sm text-muted-foreground">
              Use the invite link to add member to your workspace
            </p>
            <div className="mt-4">
              <div className="flex items-center gap-x-2">
                <Input disabled value={fullInviteLink} />
                <Button
                  onClick={handleCopyInviteLink}
                  size="sm"
                  variant="secondary"
                  type="button"
                  className="size-12"
                >
                  <CopyIcon className="size-5" />
                </Button>
              </div>
            </div>
            <DottedSeparator className="py-7" />
            <Button
              className="mt-6 w-fit ml-auto"
              size="sm"
              variant="destructive"
              type="button"
              disabled={
                isPending || isDeletingWorkspace || isResettingInviteLink
              }
              onClick={handleResetInviteLink}
            >
              Reset Invite Link
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card className="w-full h-full  border-none shadow-none">
        <CardContent className="p-7">
          <div className="flex flex-col ">
            <h3 className="font-bold">Danger Zone</h3>
            <p className="text-sm text-muted-foreground">
              Deleting a workspace is irreversible and we will remove all
              associated data.
            </p>
            <DottedSeparator className="py-7" />
            <Button
              className="mt-6 w-fit ml-auto"
              size="sm"
              variant="destructive"
              type="button"
              disabled={isPending || isDeletingWorkspace}
              onClick={handleDelete}
            >
              Delete Workspace
              <DeleteIcon className="ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
