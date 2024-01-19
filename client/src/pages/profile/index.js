import {  Descriptions } from "antd";
import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const loggedUser = useSelector((state) => state.user.data.data);
  return (
    <div>
      <Descriptions
        title="Хэрэглэгчийн мэдээлэл"
        items={[
          { key: "1", label: "Нэр", children: loggedUser.name },
          { key: "2", label: "Цахим хаяг", children: loggedUser.email },
          { key: "3", label: "Хандах эрх", children: loggedUser.role },
        ]}
      />
    </div>
  );
};

export default Profile;
