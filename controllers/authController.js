import jws from "jsonwebtoken";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import User from "../models/User.js";

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
