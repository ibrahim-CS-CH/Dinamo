import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const postsSchema = z.object({
  title: z.string().min(3),
  body: z.string().min(3),
});

export type PostsSchemaType = z.infer<typeof postsSchema>;
export const postsResolver = zodResolver(postsSchema);
