import axios from "axios";
import { useCallback, useEffect, useState } from "react";

import { appConfig } from "@/config";
import { apiEndpoints } from "@/constants/api.endpoints";
import { PostsContext } from ".";

export const PostsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [posts, setPosts] = useState<IPosts[]>([]);
  const [isFetched, setIsFetched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getPosts = useCallback(async () => {
    if (isFetched) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `${appConfig.apiBaseUrl}/${apiEndpoints.posts.root}`
      );
      if (response.status === 200) {
        setPosts(response.data);
        setIsFetched(true);
      } else {
        console.error("Failed to fetch posts:", response);
        setError("Failed to fetch posts. Please try again later.");
      }
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError("An error occurred while fetching posts.");
    } finally {
      setLoading(false);
    }
  }, [isFetched]);

  const setPostsValue = (newPosts: IPosts[]) => {
    setPosts(newPosts);
  };

  const addPost = (newPost: IPosts) => {
    setPosts((prevPosts) => [...prevPosts, newPost]);
  };

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <PostsContext.Provider
      value={{
        posts,
        getPosts,
        setPosts: setPostsValue,
        loading,
        error,
        addPost,
      }}>
      {children}
    </PostsContext.Provider>
  );
};
