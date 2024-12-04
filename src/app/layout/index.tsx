import { Outlet } from "react-router-dom";

import Header from "@/app/layout/header";
import Sidebar from "@/app/layout/sidebar";
import DrawerMenu from "@/app/layout/sidebar/drawer-menu";

export default function RootLayout() {
  return (
    <section className="flex">
      <Sidebar />
      <main className="flex-1">
        <Header />
        <div className="flex-1 p-6 md:p-10">
          <Outlet />
          <DrawerMenu />
        </div>
      </main>
    </section>
  );
}
