import { ColumnDef } from "@tanstack/react-table";

import ShowUser from "@/app/posts/components/show-user";

export const PostsListColumns: ColumnDef<IPosts>[] = [
  {
    accessorKey: "body",
    header: "Body",
  },
  {
    accessorKey: "title",
    header: "Title",
  },

  {
    accessorKey: "userId",
    header: "User name",
    cell: ({ row: { original } }) => {
      return <ShowUser userId={original.userId} />;
    },
  },
];
