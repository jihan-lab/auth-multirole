import argon2 from "argon2";
import Users from "../models/UserModels.js";

export const getUsers = async (req, res) => {
  try {
    const response = await Users.findAll({
      attributes: ["uuid", "name", "email", "role"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const response = await Users.findOne({
      attributes: ["uuid", "name", "email", "role"],
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createUser = async (req, res) => {
  const { name, email, password, confPassword, role } = req.body;
  const response = await Users.findAll({
    attributes: ["uuid", "name", "email", "role"],
  });

  const data = response.filter(
    (item) => item.email === email || item.name === name
  );

  if (data.length !== 0) {
    if (data[0].email === email)
      return res
        .status(400)
        .json({ msg: "Email sudah digunakan, cari email yang lain" });
    if (data[0].name === name) {
      return res
        .status(400)
        .json({ msg: "Username sudah digunakan, cari nama yang lain" });
    }
  }
  if (password !== confPassword)
    return res
      .status(400)
      .json({ msg: "Password dan Confirm Password tidak cocok" });
  const hashPassword = await argon2.hash(password);
  try {
    await Users.create({
      name: name,
      email: email,
      password: hashPassword,
      role: role,
    });
    res.status(201).json({ msg: "Register berhasil" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateUser = async (req, res) => {
  const user = await Users.findOne({
    where: {
      uuid: req.params.id,
    },
  });

  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  const { name, email, password, confPassword, role } = req.body;

  const response = await Users.findAll();
  const dataTemp = response.filter((item) => item.uuid !== user.uuid);
  const data = dataTemp.filter(
    (item) => item.email === email || item.name === name
  );

  if (data.length !== 0) {
    if (data[0].email === email)
      return res
        .status(400)
        .json({ msg: "Email sudah digunakan, cari email yang lain" });
    if (data[0].name === name) {
      return res
        .status(400)
        .json({ msg: "Username sudah digunakan, cari nama yang lain" });
    }
  }

  let hashPassword;
  if (password === "" || password === null) {
    hashPassword = user.password;
  } else {
    hashPassword = await argon2.hash(password);
  }
  if (password !== confPassword)
    return res
      .status(400)
      .json({ msg: "Password dan Confirm Password tidak cocok" });

  try {
    await Users.update(
      {
        name: name,
        email: email,
        password: hashPassword,
        role: role,
      },
      {
        where: {
          id: user.id,
        },
      }
    );
    res.status(200).json({ msg: "Update data user berhasil" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const user = await Users.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  try {
    await Users.destroy({
      where: {
        id: user.id,
      },
    });
    res.status(200).json({ msg: "Hapus Data Berhasil" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
