import { Row } from "@tanstack/react-table";
import { EyeIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import PageTitle from "@/components/general/page-title";
import SpinnerLoader from "@/components/loaders/spinner-loader";
import { DataTable } from "@/components/table";
import DeleteTableRow from "@/components/table/delete-row";
import { useDeleteTableRow } from "@/components/table/delete-row/use-delete-table-row";
import { Button } from "@/components/ui/button";
import { appConfig } from "@/config";
import { apiEndpoints } from "@/constants/api.endpoints";
import { appRoutes } from "@/constants/app-routes";
import { usePosts } from "@/lib/context/posts";
import { useErrorHandler } from "@/lib/hooks/use-error-handler";
import EditPost from "../edit-post";
import { PostsListColumns } from "./posts-list-columns";

export function Component() {
  const [rowId, setRowId] = useState<number | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [rowData, setRowData] = useState<IPosts | null>(null);

  const { handleError } = useErrorHandler();
  const { posts, loading, error, setPosts } = usePosts();
  const { deleteRow, cancelDeletion, open, setOpen, setRowUrl } =
    useDeleteTableRow({
      onDelete: () => {
        const filterPosts = posts.filter((post) => post.id != rowId);
        setPosts(filterPosts);
      },
      successMessage: "Row deleted successfully!",
    });

  if (loading) return <SpinnerLoader />;
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <PageTitle title="Posts" />
        <Link to={appRoutes.posts.add}>
          <Button className="min-w-32">Create</Button>
        </Link>
      </div>

      <DataTable<IPosts, unknown>
        columns={PostsListColumns}
        data={posts.length > 0 ? posts : []}
        error={handleError(error)}
        rowActions={() => {
          return [
            {
              title: "edit",
              onClick: (row: Row<IPosts>) => {
                setRowData(row.original);
                setEditOpen(true);
              },
              icon: <EyeIcon size="18" />,
            },
            {
              title: "delete",
              onClick: (row: Row<IPosts>) => {
                setOpen(true);
                setRowUrl(
                  `${appConfig.apiBaseUrl}/${apiEndpoints.posts.post(
                    +row.original.id
                  )}`
                );
                setRowId(+row.original.id);
              },
              icon: <TrashIcon size={18} />,
            },
          ];
        }}
      />

      <DeleteTableRow
        open={open}
        onOpenChange={setOpen}
        message="Are u sure to delete this post, this action can't be undo.!"
        onCancel={cancelDeletion}
        onConfirm={deleteRow}
      />
      <EditPost
        onCancel={() => setRowData(null)}
        onConfirm={() => {
          setRowData(null);
          setEditOpen(false);
        }}
        open={editOpen}
        onOpenChange={setEditOpen}
        row={rowData}
      />
    </section>
  );
}

Component.displayName = "PostsList";
