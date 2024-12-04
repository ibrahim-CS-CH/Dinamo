import axios from "axios";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import PageTitle from "@/components/general/page-title";
import { RHFLabeledInput } from "@/components/react-hook-form/rhf-labeled-input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { appConfig } from "@/config";
import { apiEndpoints } from "@/constants/api.endpoints";
import { appRoutes } from "@/constants/app-routes";
import { useErrorHandler } from "@/lib/hooks/use-error-handler";
import { postsResolver, PostsSchemaType } from "./posts.schema";
import { usePosts } from "@/lib/context/posts";

export function Component() {
  const navigate = useNavigate();
  const { handleError } = useErrorHandler();
  const { addPost } = usePosts();

  const { register, formState, handleSubmit } = useForm<PostsSchemaType>({
    mode: "onChange",
    resolver: postsResolver,
  });
  const onSubmit = async (data: PostsSchemaType) => {
    // issume that userId = 1 //
    try {
      const response = await axios.post(
        `${appConfig.apiBaseUrl}/${apiEndpoints.posts.root}`,
        {
          ...data,
          userId: 1,
        }
      );

      if (response.status === 201) {
        toast.success("Created successfully");
        addPost(response.data);
        navigate(appRoutes.posts.root);
      } else {
        toast.warning("Something unexpected happened");
        console.log("Unexpected response:", response);
      }
    } catch (error: any) {
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
  };

  return (
    <section className="flex flex-col gap-4 lg:gap-8 ">
      <PageTitle title={"Add new post"} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 lg:gap-8">
        <Card>
          <CardContent className="flex flex-col gap-4 pt-6">
            <div className="flex md:flex-row flex-col justify-between w-full gap-4">
              <RHFLabeledInput
                {...register("title")}
                label="Title"
                placeholder="Title"
                error={handleError(formState.errors.title)}
              />
              <RHFLabeledInput
                {...register("body")}
                label="Body"
                placeholder="Body"
                error={handleError(formState.errors.body)}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-2">
          <Button
            type="submit"
            variant="default"
            disabled={false}
            className="flex-1 sm:flex-none min-w-36">
            Create
          </Button>
          <Link
            to={appRoutes.posts.root}
            className={clsx("flex-1 sm:flex-none min-w-36", {
              "pointer-events-none": false,
            })}>
            <Button variant="destructive" className="w-full" disabled={false}>
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </section>
  );
}

Component.displayName = "AddPost";
