import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../header/sidebar";
import "./layout-header.scss";
import Header from "../header/header";

const LayoutHeader = () => {
  const [collapsed, setCollapsed] = useState(true);

  const onToggleSidebar = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <div className="layout">
      <Header onToggleSidebar={onToggleSidebar} />
      <div className="content-area">
        <Sidebar collapsed={collapsed} />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default LayoutHeader;
