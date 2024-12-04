import { clsx } from "clsx";
import { NotebookText } from "lucide-react";
import { Link } from "react-router-dom";

import MenuItem from "@/app/layout/sidebar/menu-item";
import { appRoutes } from "@/constants/app-routes";

export default function Sidebar() {
  return (
    <aside
      className={clsx([
        "bg-secondary text-secondary-foreground basis-60 min-h-screen",
        "hidden md:block",
      ])}>
      <div className="sticky top-0">
        <div className="flex flex-col gap-4 h-full overflow-auto">
          <Link
            to={appRoutes.root}
            className="flex justify-center items-center h-14">
            <img
              src="https://media.licdn.com/dms/image/v2/D4D0BAQGKZROW9HS5oA/company-logo_200_200/company-logo_200_200/0/1727106223229/dinamo_mea_logo?e=1741219200&v=beta&t=fo_4KuEZd7mZLHzhiAgSgjUguTaoyUcTRVkgeen6a9Q"
              alt="app-logo"
              className="h-12"
            />
          </Link>

          <nav className="flex flex-col">
            <MenuItem
              to={appRoutes.posts.root}
              title="Posts"
              icon={<NotebookText />}
            />
          </nav>
        </div>
      </div>
    </aside>
  );
}
