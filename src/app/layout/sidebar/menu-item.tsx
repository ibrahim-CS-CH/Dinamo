import clsx from "clsx";
import { NavLink } from "react-router-dom";

export default function MenuItem({
  to,
  title,
  icon,
  onClick,
}: {
  to: string;
  title: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <NavLink
      className={({ isActive }) =>
        clsx("px-2 py-3 hover:bg-primary/10 flex items-center gap-2", {
          "bg-primary/5": isActive,
        })
      }
      to={to}
      onClick={onClick}>
      <span>{icon}</span>
      <span>{title}</span>
    </NavLink>
  );
}
