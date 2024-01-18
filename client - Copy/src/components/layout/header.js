import { Button, Dropdown } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";
const items = [
  {
    key: "1",
    label: <a href="/profile">Профайл</a>,
  },
  {
    key: "2",
    label: <a href="/login">Гарах</a>,
  },
];
function HeaderLayout({ activePath, data, logout }) {
  return (
    <header className="header-layout">
      <div className="menu-layout">
        <ul>
          <li className={activePath === `/profile` ? "active" : ""}>
            <NavLink to={"profile"}>Профайл</NavLink>
          </li>
          <li className={activePath === `/users` ? "active" : ""}>
            <NavLink to={"users"}>Хэрэглэгч</NavLink>
          </li>
        </ul>
      </div>
      <div>
        <Dropdown
          menu={{
            items,
          }}
          placement="bottom"
        >
          <Button className="user-layout">Ж.Оргил-Од</Button>
        </Dropdown>
      </div>
    </header>
  );
}

export default HeaderLayout;
