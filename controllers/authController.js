import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import User from "../models/User.js";

export const generateToken = (id) => {
  console.log(process.env.JWT_SECRET);
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "10 h" });
};

export const registerUser = asyncHandler(async (req, res) => {
  const { name, lastname, email, password } = req.body;

  //validar q se envio bien el usuario
  if (!name || !lastname || !email || !password) {
    res.status(400);
    throw new Error("metele files");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("ya existe ese usuario tilin");
  }

  //has password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //creaste el usuario
  const userCreated = await User.create({
    name,
    lastname,
    email,
    password: hashedPassword,
  });

  if (userCreated) {
    res.status(201).json({
      id: userCreated.id,
      name: userCreated.name,
      lastname: userCreated.lastname,
      email: userCreated.email,
    });
  } else {
    res.status(400);
    throw new Error("datos del usuario invalidos");
  }

  res.send("te registraste potac");
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("No hay usuario con este email");
  }

  const checkPassword = await bcrypt.compare(password, user.password);

  if (checkPassword) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error(" los caracteres no coinciden");
  }
});
