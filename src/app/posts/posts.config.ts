import { appRoutes } from "@/constants/app-routes";

export const postsConfig = {
  routes: {
    path: "",
    children: [
      {
        path: "",
        lazy: () => import("@/app/posts/list"),
      },
      {
        path: appRoutes.posts.add,
        lazy: () => import("@/app/posts/add-post"),
      },
    ],
  },
};
