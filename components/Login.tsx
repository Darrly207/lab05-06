"use client";
import { useDispatch } from "react-redux";
import "./loginCss.css";
import { login } from "@/store/authSlice";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
const Login = () => {
  const navigation = useRouter();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://user-auth-api-nestjs.onrender.com/auth/login",
        {
          username: username,
          password: password,
        }
      );
      const userData = response.data;
      dispatch(login(userData));
      navigation.push("/profile");
    } catch (error) {
      console.log(error);
      alert("Đăng nhập thất bại!");
    }
  };
  return (
    <div className="bodyLogin">
      <div className="wrapper">
        <form action="login" method="post" onSubmit={handleRegister}>
          <h2>Login</h2>
          <div className="input-field">
            <input
              type="username"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>Enter your username</label>
          </div>
          <div className="input-field">
            <input
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Enter your password</label>
          </div>

          <button type="submit">Log In</button>
          <div className="register">
            <p>
              Don&apos;t have an account? <a href="/register">Register</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
