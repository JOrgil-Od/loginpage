import {
  Button,
  Col,
  Input,
  Modal,
  Row,
  Select,
  Table,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { apiUrl } from "../../constants/defaultValues";
import myAxios from "../../helpers/tokenAxios";

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import ButtonGroup from "antd/es/button/button-group";

const Users = () => {
  const columns = [
    {
      title: "Нэр",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Имэйл",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Эрх",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Үйлдэл",
      dataIndex: "",
      key: "x",
      render: (_, record) => (
        <ButtonGroup>
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              clickUpdateData(record);
            }}
          ></Button>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => {
              clickDeleteData(record);
            }}
          ></Button>
        </ButtonGroup>
      ),
    },
  ];
  const [mainData, setMainData] = useState([]);
  const [formData, setFormData] = useState({
    type: "add",
    name: "",
    email: "",
    role: "",
    password: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleFormData = (field, value) => {
    setFormData((prev) => {
      return { ...prev, [field]: value };
    });
  };
  const clickSaveData = () => {
    setIsModalOpen(true);
    setFormData({
      type: "add",
      name: "",
      email: "",
      role: "",
      password: "",
    });
  };

  const clickUpdateData = (val) => {
    setFormData({
      type: "edit",
      name: val.name,
      email: val.email,
      role: val.role,
      password: val.password,
    });
    setIsModalOpen(true);
  };
  const handleOk = () => {
    if (formData.type === "add") {
      myAxios
        .post(`${apiUrl}/users`, formData)
        .then((res) => {
          console.log("res", res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      myAxios
        .put(`${apiUrl}/users`, formData)
        .then((res) => {
          console.log("res", res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setIsModalOpen(false);
  };
  const clickDeleteData = (val) => {
    myAxios
      .delete(`${apiUrl}/users/${val.id}`)
      .then((res) => {
        console.log(res);
        console.log(res);
      })
      .catch((err) => console.log(err));
    console.log("delete", val);
  };
  useEffect(() => {
    myAxios
      .get(`${apiUrl}/users`)
      .then((res) => setMainData(res.data.data))
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <Modal
        title="Хэрэглэгчийн мэдээлэл"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Typography.Title level={5}>Хэрэглэгчийн нэр</Typography.Title>
            <Input
              value={formData.name}
              onChange={(e) => handleFormData("name", e.target.value)}
            />
          </Col>
          <Col span={12}>
            <Typography.Title level={5}>Имэйл хаяг</Typography.Title>
            <Input
              value={formData.email}
              onChange={(e) => handleFormData("email", e.target.value)}
            />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Typography.Title level={5}>Хандах эрх</Typography.Title>
            <Select
              defaultValue="user"
              value={formData.role}
              style={{ width: "100%" }}
              onChange={(e) => handleFormData("role", e)}
              options={[
                { value: "user", label: "user" },
                { value: "admin", label: "admin" },
              ]}
            />
          </Col>
          <Col span={12}>
            <Typography.Title level={5}>Нууц үг</Typography.Title>
            <Input
              value={formData.password}
              onChange={(e) => handleFormData("password", e.target.value)}
            />
          </Col>
        </Row>
      </Modal>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <Input placeholder="Хайлт" style={{ width: "500px" }} />
        <Button type="primary" onClick={() => clickSaveData()}>
          Нэмэх
        </Button>
      </div>
      <Table dataSource={mainData} columns={columns} />
    </div>
  );
};

export default Users;
