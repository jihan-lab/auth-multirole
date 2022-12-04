import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const FormEditUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [role, setRole] = useState("user");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/users/${id}`, {
        name: name,
        email: email,
        password: password,
        confPassword: confPassword,
        role: role,
      });
      navigate("/user");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  useEffect(() => {
    const getProductById = async () => {
      const response = await axios.get(`http://localhost:5000/users/${id}`);
      setName(response.data.name);
      setEmail(response.data.email);
      setRole(response.data.role);
    };
    getProductById();
  }, [id]);

  return (
    <div className="container">
      <h1>Update User</h1>
      {msg && (
        <div className="alert alert-danger my-3">
          <strong>{msg}</strong>
        </div>
      )}
      <form className="mt-2" onSubmit={updateUser}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Username
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="form-control"
            id="name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="form-control"
            id="email"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="form-control"
            id="password"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confPassword" className="form-label">
            Confirm Password
          </label>
          <input
            value={confPassword}
            onChange={(e) => setConfPassword(e.target.value)}
            type="password"
            className="form-control"
            id="confPassword"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Role
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="form-select"
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Save User
        </button>
      </form>
    </div>
  );
};

export default FormEditUser;
