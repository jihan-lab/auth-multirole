import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProductList from "../components/ProductList";
import { getMe } from "../features/authSlice";
import Layout from "./Layout";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/login");
    }
  }, [isError, navigate]);

  return (
    <div>
      <Layout>
        <div className="container">
          <h1>Dashboard</h1>
          <h2 className="badge bg-info">
            Welcome <strong>{user && user.name}</strong>
          </h2>
        </div>
      </Layout>
    </div>
  );
};

export default Dashboard;
