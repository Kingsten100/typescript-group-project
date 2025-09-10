// components/Layout.tsx
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className='layout'>
      <Navbar />
      <div className='main-content'>
        <Sidebar />
        <div className='content'>
          <Outlet />
        </div>
      </div>
    </div>
  )
};

export default Layout;
