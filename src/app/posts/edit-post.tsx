import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { RHFLabeledInput } from "@/components/react-hook-form/rhf-labeled-input";
import { RHFLabeledTextarea } from "@/components/react-hook-form/rhf-labeled-textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Card } from "@/components/ui/card";
import { appConfig } from "@/config";
import { apiEndpoints } from "@/constants/api.endpoints";
import { usePosts } from "@/lib/context/posts";
import { useErrorHandler } from "@/lib/hooks/use-error-handler";
import { postsResolver, PostsSchemaType } from "./posts.schema";

export default function EditPost({
  open,
  onOpenChange,
  row,
  onCancel,
  onConfirm,
}: React.ComponentProps<typeof AlertDialog> & {
  row: IPosts | null;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const { setPosts, posts } = usePosts();
  const { handleError } = useErrorHandler();
  const { register, handleSubmit, formState } = useForm<PostsSchemaType>({
    mode: "onChange",
    resolver: postsResolver,
    values: row
      ? {
          body: row?.body,
          title: row?.title,
        }
      : undefined,
  });

  const onSubmit = async (data: PostsSchemaType) => {
    if (row?.id) {
      try {
        const response = await axios.put(
          `${appConfig.apiBaseUrl}${apiEndpoints.posts.post(row.id)}`,
          {
            ...data,
            userId: row.userId,
          }
        );
        if (response.status === 200) {
          toast.success("Updated successfully");
          const updatedPost = response.data;
          const newUpdatedPosts = posts.map((post) =>
            post.id === updatedPost.id ? updatedPost : post
          );
          setPosts(newUpdatedPosts);
          onConfirm();
        } else {
          toast.warning("Something unexpected happened");
          onConfirm();
        }
      } catch (error: any) {
        onConfirm();
        if (axios.isAxiosError(error)) {
          if (error.response) {
            toast.error(
              `Failed: ${error.response.status} ${
                error.response.data?.message || "Unknown error"
              }`
            );
            console.error("Response error:", error.response.data);
          } else if (error.request) {
            toast.error("No response from server. Please try again.");
            console.error("Request error:", error.request);
          } else {
            toast.error(`Request error: ${error.message}`);
            console.error("Setup error:", error.message);
          }
        } else {
          toast.error("An unexpected error occurred.");
          console.error("Unexpected error:", error);
        }
      }
    } else {
      onConfirm();
      console.log("we didn't found id");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-4xl min-h-[40vh]">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex gap-2 items-center">
            Edit <AlertDialogDescription>{row?.title}</AlertDialogDescription>
          </AlertDialogTitle>
        </AlertDialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card className="flex flex-col gap-4 lg:gap-8 p-4 lg:p-6">
            <div className="flex flex-col gap-4">
              <RHFLabeledInput
                {...register("title")}
                label="Title"
                placeholder="Title"
                error={handleError(formState.errors.title)}
              />
              <RHFLabeledTextarea
                {...register("body")}
                label="Body"
                placeholder="Body"
                error={handleError(formState.errors.body)}
                className="h-fit"
                rows={5}
              />
            </div>
          </Card>
          <AlertDialogFooter className="mt-4">
            <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              type="submit"
              className="bg-destructive hover:bg-destructive/90">
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
