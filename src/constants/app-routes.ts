import { appRoutesDefinition } from "@/constants/app-routes.definition";

export const appRoutes = {
  root: "/",
  posts: {
    root: appRoutesDefinition.posts.root,
    add: appRoutesDefinition.posts.add,
    post: (postId: string | number) => {
      return appRoutesDefinition.posts.post.replace(":postId", `${postId}`);
    },
  },
};
