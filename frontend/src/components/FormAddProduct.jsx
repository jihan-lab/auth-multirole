import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const FormAddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const saveProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/products`, {
        name: name,
        price: price,
      });
      navigate("/product");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };
  return (
    <div className="container">
      <h1>Add Product</h1>
      {msg && (
        <div className="alert alert-danger my-3">
          <strong>{msg}</strong>
        </div>
      )}
      <form className="mt-2" onSubmit={saveProduct}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Nama Produk
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
          <label htmlFor="price" className="form-label">
            Harga Produk
          </label>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            className="form-control"
            id="price"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Save Product
        </button>
      </form>
    </div>
  );
};

export default FormAddProduct;
