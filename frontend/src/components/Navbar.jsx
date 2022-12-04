import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <div className="container">
          <NavLink className="navbar-brand fw-bold" to="/">
            Menu
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
