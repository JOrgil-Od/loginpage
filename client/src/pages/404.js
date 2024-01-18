import React from "react";
import { Result, Button } from "antd";
// import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const NotFound = () => {
  // const loggedUser = useSelector(state => state.user);

  return (
    <Result
      status="404"
      title="404"
      subTitle="Ийм хуудас олдсонгүй."
      extra={
        <NavLink
          to="/login"
          // to={loggedUser.isAuth ? `${loggedUser.data.defaultPath}` : "/login"}
        >
          <Button type="primary">Эхлэл хуудас</Button>{" "}
        </NavLink>
      }
    />
  );
};
export default NotFound;
