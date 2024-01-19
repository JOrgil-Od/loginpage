import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../redux/auth/authService";
import { loginSuccess } from "../../redux/auth/authSlice";
import { Navigate } from "react-router-dom";
import LocalStorageService from "../../helpers/LocalStorageService";
import axios from "../../helpers/tokenAxios";
import { Button, Input, Typography } from "antd";

function Login() {
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    email: "admin@gmail.com",
    password: "admin",
  });

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ ...formData }));
  };
  if (loggedUser.isAuth) {
    return <Navigate to={"/profile"} />;
  } else {
    if (LocalStorageService.getToken() !== null) {
      axios
        .get("/users/currentUser")
        .then((result) => {
          dispatch(loginSuccess(result.data.user));
        })
        .catch((err) => {
          LocalStorageService.clearToken();
          window.location.href = `/login`;
        });
      return (
        <div className="d-flex justify-content-center align-content-center">
          <div style={{ height: "50vh" }}>Түр хүлээнэ үү ...</div>
        </div>
      );
    }
  }
  return (
    <div style={{ height: "100vh", backgroundColor: "#fff" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "300px",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            padding: "40px",
          }}
        >
        <Typography.Title level={5}>Нэвтрэх нэр</Typography.Title>
          <Input
            style={{marginBottom:"15px"}}
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            />
          <Typography.Title level={5}>Нууц үг</Typography.Title> 
          <Input
            style={{marginBottom:"15px"}}
            type="password"
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
          />
          <Button
            style={{ marginTop: "20px", width: "120px", border: "1px solid #eee" }}
            onClick={handleSubmit}
            type="submit"
          >
            Нэвтрэх
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
