import { createContext, useContext } from "react";

interface ProductsContextProps {
  posts: IPosts[];
  getPosts: () => Promise<void>;
  setPosts: (newPosts: IPosts[]) => void;
  addPost: (newPosts: IPosts) => void;
  error: any;
  loading: boolean;
}

export const initialPostsValue: ProductsContextProps = {
  posts: [],
  loading: false,
  error: null,
  setPosts: () => {},
  getPosts: async () => {},
  addPost: () => {},
};

export const PostsContext = createContext<ProductsContextProps | undefined>(
  undefined
);

export const usePosts = () => {
  const ctx = useContext(PostsContext);
  if (!ctx)
    throw new Error(
      "useContext must be used within a PostsProvider. " +
        "Make sure that your component is wrapped in a <PostsProvider>. "
    );
  return ctx;
};
