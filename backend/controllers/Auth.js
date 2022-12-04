import argon2 from "argon2";
import Users from "../models/UserModels.js";

export const Login = async (req, res) => {
  if (req.session.userId) {
    return res
      .status(400)
      .json({ msg: "Mohon logout dari aku sebelumnya terlebih dahulu" });
  }
  const user = await Users.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (!user) return res.status(400).json({ msg: "Email user tidak ditemukan" });
  const match = await argon2.verify(user.password, req.body.password);
  if (!match) return res.status(400).json({ msg: "Wrong password" });
  req.session.userId = user.uuid;
  const uuid = user.uuid;
  const name = user.name;
  const email = user.email;
  const role = user.role;

  res.status(200).json({ uuid, name, email, role });
};

export const Me = async (req, res) => {
  if (!req.session.userId)
    return res.status(401).json({ msg: "Mohon login ke akun anda" });

  const user = await Users.findOne({
    attributes: ["uuid", "name", "email", "role"],
    where: {
      uuid: req.session.userId,
    },
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  res.status(200).json(user);
};

export const Logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(400).json({ msg: "tidak dapat logout" });
    res.status(200).json({ msg: "Anda telah logout" });
  });

  //   res.json({ msg: "hai" });
  //   console.log("hai");
};
