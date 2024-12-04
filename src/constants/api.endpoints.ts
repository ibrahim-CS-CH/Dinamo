export const apiEndpoints = {
  posts: {
    root: "/posts",
    post: (postId: string | number) => `/posts/${postId}`,
  },
  users: {
    root: "/users",
    user: (userId: string | number) => `/users/${userId}`,
  },
};
