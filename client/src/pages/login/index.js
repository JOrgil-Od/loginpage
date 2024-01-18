import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../redux/auth/authService";
import { loginSuccess } from "../../redux/auth/authSlice";
import { Navigate } from "react-router-dom";
import LocalStorageService from "../../helpers/LocalStorageService";
import axios from "../../helpers/tokenAxios";
import { Button, Input } from "antd";

function Login() {
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    <div style={{ height: "100vh", backgroundColor: "#e4f3f2" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "300px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#fff",
            borderRadius: "10px",
          }}
        ></div>
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
          <Input
            id="standard-basic"
            label="Нэвтрэх нэр"
            variant="standard"
            sx={{ m: 1, mt: 4, width: "300px" }}
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
          />
          <Input
            id="standard-basic"
            label="Нууц үг"
            type="password"
            variant="standard"
            sx={{ m: 1, width: "300px" }}
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
          />
          <Button
            variant="contained"
            size="small"
            sx={{ marginTop: "40px", width: "120px" }}
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
