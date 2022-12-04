import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [product, setProduct] = useState([]);

  const getProduct = async () => {
    const response = await axios.get(`http://localhost:5000/products`);
    setProduct(response.data);
  };

  const deleteProduct = async (productId) => {
    const response = window.confirm("Apakah kamu yakin ingin hapus data ini ?");
    if (response) {
      await axios.delete(`http://localhost:5000/products/${productId}`);
    }
    getProduct();
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="container">
      <h1>Product</h1>
      <Link to="/product/add">
        <button className="btn btn-primary my-3">Add Product</button>
      </Link>
      <table className="table mt-1">
        <thead>
          <tr>
            <th className="text-center" scope="col">
              No
            </th>
            <th scope="col">Product Name</th>
            <th className="text-center" scope="col">
              Price
            </th>
            <th className="text-center" scope="col">
              Created By
            </th>
            <th className="text-center" scope="col">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {product.map((item, index) => (
            <tr key={item.uuid}>
              <th className="text-center" scope="row">
                {index + 1}
              </th>
              <td>{item.name}</td>
              <td className="text-center">Rp. {item.price.toLocaleString()}</td>
              <td className="text-center">{item.user.name}</td>
              <td className="text-center">
                <Link
                  to={`/product/edit/${item.uuid}`}
                  className="btn btn-warning"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteProduct(item.uuid)}
                  className="btn btn-danger ms-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
