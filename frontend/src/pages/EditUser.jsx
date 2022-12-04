import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormEditUser from "../components/FormEditUser";
import { getMe } from "../features/authSlice";
import Layout from "./Layout";

const EditUser = () => {
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
    if (user && user.role !== "admin") {
      navigate("/");
    }
  }, [isError, user, navigate]);

  return (
    <Layout>
      <FormEditUser />
    </Layout>
  );
};

export default EditUser;
