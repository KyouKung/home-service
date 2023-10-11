import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { supabase } from "../utils/db.js";

export const authRouter = Router();

authRouter.post("/login", async (req, res) => {
  const loginIdentifier = req.body.loginIdentifier;
  const password = req.body.password;

  const isEmail = /\S+@\S+\.\S+/.test(loginIdentifier);

  let user;

  if (isEmail) {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", loginIdentifier)
      .single();

    user = data;
  }

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  //   const isValidPassword = await bcrypt.compare(password, user.password);

  //   if (!isValidPassword) {
  //     return res.status(400).json({
  //       message: "Password not valid",
  //     });
  //   }

  const token = jwt.sign(
    { email: user.email, user_id: user.user_id, role: user.role },
    `${process.env.SECRET_KEY}`,
    {
      expiresIn: "900000",
    }
  );

  const userData = user;

  return res.status(200).json({
    message: "Login successful",
    token,
    userData,
    role: user.role,
  });
});

authRouter.post("/register", async (req, res) => {
  const loginIdentifier = req.body.loginIdentifier;
  const password = req.body.password;

  const isEmail = /\S+@\S+\.\S+/.test(loginIdentifier);

  const newData = {
    fullname: "Dummy",
    email: loginIdentifier,
    password: password,
    role: "user",
  };

  if (isEmail) {
    const { data, error } = await supabase.from("users").insert(newData);
  }

  return res.status(200).json({
    message: "Register successful",
  });
});

export default authRouter;

authRouter.get("/:userId", async (req, res) => {
  const user_id = req.params.userId;
  let { data: users, error } = await supabase
    .from("users")
    .select("*")
    .eq("user_id", user_id);

  if (!users) {
    return res.json({
      message: "No user found",
    });
  }

  return res.json({
    data: users,
  });
});
