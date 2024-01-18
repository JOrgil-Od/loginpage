import React from "react";
import { useLocation, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/auth/authService.js";
import FooterLayout from "./footer";
import HeaderLayout from "./header";

function MainLayout(props) {
  const location = useLocation();
  const user = useSelector((state) => state.user.data);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div className="main-layout">
      <HeaderLayout
        activePath={location.pathname}
        data={user}
        logout={handleLogout}
      />
      <div className="children">
        <div className="card">
          <div className="card-body">
            <Outlet />
          </div>
        </div>
      </div>
      <FooterLayout />
    </div>
  );
}
export default MainLayout;
