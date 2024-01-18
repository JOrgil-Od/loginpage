import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { loginSuccess } from "../redux/auth/authSlice";
import tokenAxios from "./tokenAxios";
import LocalStorageService from "./LocalStorageService";

const ProtectedRoutes = ({ children }) => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.user.isAuth);

  if (isAuth) {
    return children;
  } else {
    if (LocalStorageService.getToken() !== null) {
      tokenAxios
        .get(`/users/currentUser`)
        .then((res) => {
          if (res.status === 200 && res.data.success) {
            dispatch(loginSuccess({ ...res.data.user }));
          } else {
            LocalStorageService.clearToken();
            window.location.href = `/login`;
          }
        })
        .catch((err) => {
          console.log("err: ", err);
          LocalStorageService.clearToken();
          window.location.href = `/login`;
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
