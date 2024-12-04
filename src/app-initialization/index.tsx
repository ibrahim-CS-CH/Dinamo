import { PostsProvider } from "@/lib/context/posts/posts.provider";
import { Toaster } from "sonner";

export default function AppInitialization({
  children,
}: React.PropsWithChildren) {
  return (
    <PostsProvider>
      {children}
      <Toaster richColors />
    </PostsProvider>
  );
}
