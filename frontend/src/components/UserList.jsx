import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const UserList = () => {
  const [dataUser, setDataUser] = useState([]);
  const { user } = useSelector((state) => state.auth);
  let uuid = user && user?.name;

  const getUser = async () => {
    const response = await axios.get(`http://localhost:5000/users`);
    const dataTemp = response.data.filter((item) => item.name !== uuid);
    setDataUser(dataTemp);
  };

  const deleteUser = async (userId) => {
    const response = window.confirm("Apakah kamu yakin ingin hapus data ini ?");
    if (response) {
      await axios.delete(`http://localhost:5000/users/${userId}`);
    }
    getUser();
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="container">
      <h1>User</h1>
      <h2>{uuid}</h2>
      <Link to="/user/add">
        <button className="btn btn-primary my-3">Add User</button>
      </Link>
      <table className="table mt-1">
        <thead>
          <tr>
            <th className="text-center" scope="col">
              No
            </th>
            <th scope="col">User Name</th>
            <th className="text-center" scope="col">
              Email
            </th>
            <th className="text-center" scope="col">
              Role
            </th>
            <th className="text-center" scope="col">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {dataUser.map((item, index) => (
            <tr key={item.uuid}>
              <th className="text-center" scope="row">
                {index + 1}
              </th>
              <td>{item.name}</td>
              <td className="text-center">{item.email}</td>
              <td className="text-center">{item.role}</td>
              <td className="text-center">
                <Link
                  to={`/user/edit/${item.uuid}`}
                  className="btn btn-warning"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteUser(item.uuid)}
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

export default UserList;
