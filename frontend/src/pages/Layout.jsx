import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="row">
        <div className="col col-2">
          <Sidebar />
        </div>
        <div className="col col-10">
          <main className="m-5" style={{ minHeight: "90vh" }}>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
