import AppInitialization from "@/app-initialization";
import BaseRouterProvider from "@/app-initialization/base-router.provider";
import { appRoutesDefinition } from "@/constants/app-routes.definition";
import RootLayout from "./layout";
import { postsConfig } from "./posts/posts.config";

export default function App() {
  return (
    <AppInitialization>
      <BaseRouterProvider
        renderRoutes={() => [
          {
            path: appRoutesDefinition.root,
            element: <RootLayout />,
            errorElement: <p>Root error</p>,
            children: [
              {
                path: appRoutesDefinition.posts.root,
                children: [postsConfig.routes],
              },
              {
                path: "*",
                element: <p>Page not found</p>,
                errorElement: <p>Error here</p>,
              },
            ],
          },
        ]}
      />
    </AppInitialization>
  );
}
