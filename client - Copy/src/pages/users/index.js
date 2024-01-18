import { Button, Input, Table } from "antd";
import React, { useEffect } from "react";
import axios from "axios";
import { apiUrl } from "../../constants/defaultValues";
const dataSource = [
  {
    key: "1",
    name: "Mike",
    age: 32,
    address: "10 Downing Street",
  },
  {
    key: "2",
    name: "John",
    age: 42,
    address: "10 Downing Street",
  },
];

const columns = [
  {
    title: "Нэр",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Имайл",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Эрх",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Үйлдэл",
    dataIndex: "",
    key: "x",
    render: () => (
      <div>
        <a>Засах</a>
        <a>Устгах</a>
      </div>
    ),
  },
];
function Users() {
  useEffect(() => {
    axios
      .get(`${apiUrl}/users`)
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <Input placeholder="Хайлт" style={{ width: "500px" }} />
        <Button type="primary">Нэмэх</Button>
      </div>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
}

export default Users;
