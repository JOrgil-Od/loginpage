import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { loginSuccess } from "../redux/auth/authSlice";
import axios from "../helpers/axios";
import tokenAxios from "../helpers/tokenAxios";
import LocalStorageService from "./LocalStorageService";
import axios1 from 'axios'

const ProtectedRoutes = ({ children, role }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.data);
  const isAuth = useSelector((state) => state.user.isAuth);

  if (isAuth) {
    const roles = currentUser.roles.filter(
      (rl) => rl.name.toLowerCase() === role.toLowerCase()
    );

    if (roles.length > 0) {
      return children;
    } else {
      return <Navigate to="/403" />;
    }
  } else {
    if (LocalStorageService.getAccessToken() !== null) {
      console.log("end")
      tokenAxios
        .get(`/users/currentUser`)
        .then((res) => {
          console.log("res: ",res)
          if (res.status === 200 && res.data.success) {
            dispatch(loginSuccess(res.data.user));
          } else {
            LocalStorageService.clearToken();
            window.location.href="/login"
          }
        })
        .catch((err) => {
          console.log("err: ",err)
          LocalStorageService.clearToken();
          window.location.href="/login"
          
        });
      return (
        <div className="d-flex justify-content-center align-content-center">
          <div style={{ height: "50vh" }}>Түр хүлээнэ үү ...</div>
        </div>
      );
    } else {
      return <Navigate to="/login" />;
    }
  }
};

export default ProtectedRoutes;
