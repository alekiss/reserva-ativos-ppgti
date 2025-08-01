import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../header/sidebar";
import "./layout-header.scss";
import Header from "../header/header";
import SidebarAdmin from "../header/sidebar-admin";
import { useAuth } from "../../context/auth-context";

const LayoutHeader = () => {
  const [collapsed, setCollapsed] = useState(true);
  const { role } = useAuth();

  const onToggleSidebar = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <div className="layout">
      <Header onToggleSidebar={onToggleSidebar} />
      <div className="content-area">

         {role === "ADMIN" ? (
          <SidebarAdmin collapsed={collapsed} />
        ) : (
          <Sidebar collapsed={collapsed} />
        )}

        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default LayoutHeader;
