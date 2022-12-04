import React from "react";
import { IoPerson, IoPricetag, IoLockClosed } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Logout, reset } from "../features/authSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const logout = () => {
    const response = window.confirm("Yakin mau logout ?");
    if (response) {
      dispatch(Logout());
      dispatch(reset());
      navigate("/login");
    }
  };

  return (
    <div>
      <aside className="sidebar shadow">
        <div className="sidebar-inner">
          <nav className="sidebar-nav">
            <div className="fw-bold mb-4">
              <Link to="/" style={{ textDecoration: "none" }}>
                Dashboard
              </Link>
            </div>
            {user && user.role === "admin" && (
              <div className="mb-3">
                <IoPerson />
                <Link
                  to="/user"
                  style={{ textDecoration: "none" }}
                  className="d-inline ms-4"
                >
                  Users
                </Link>
              </div>
            )}

            <div className="mb-3">
              <IoPricetag />
              <Link
                to="/product"
                style={{ textDecoration: "none" }}
                className="d-inline ms-4"
              >
                Product
              </Link>
            </div>
            <footer className="mb-3">
              <IoLockClosed />
              <button onClick={logout} className="btn btn-light d-inline ms-3">
                Logout
              </button>
            </footer>
          </nav>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
