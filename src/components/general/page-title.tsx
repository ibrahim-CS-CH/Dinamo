import clsx from "clsx";

export default function PageTitle({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  return <p className={clsx("text-2xl font-bold", className)}>{title}</p>;
}
