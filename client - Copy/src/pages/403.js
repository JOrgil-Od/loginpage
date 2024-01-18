import React from "react";
import { Result, Button } from "antd";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const NotFound = () => {
  const loggedUser = useSelector((state) => state.user);
  return (
    <Result
      status="403"
      title="403"
      subTitle=<div>
        Хандах эрх байхгүй байна. НРП хэлтсийн аргазүйч-санхүүч ноён
        <a
          href="https://www.facebook.com/baterdene.begzsuren"
          target={"_blank"}
        >
          <span className="text-uppercase"> Б*т-Э*д*н* тэй</span>
        </a>{" "}
        холбогдоно уу.
      </div>
      extra={
        <NavLink
          to={loggedUser.isAuth ? `${loggedUser.data.defaultPath}` : "/login"}
        >
          <Button type="primary">Эхлэл хуудас</Button>{" "}
        </NavLink>
      }
    />
  );
};
export default NotFound;
