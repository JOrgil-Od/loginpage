import {
  Button,
  Col,
  Input,
  Modal,
  Row,
  Select,
  Table,
  Typography,
  notification,
} from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { apiUrl } from "../../constants/defaultValues";
import myAxios from "../../helpers/tokenAxios";

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import ButtonGroup from "antd/es/button/button-group";

const Context = React.createContext({
  name: "Default",
});
const Users = () => {
  const [api, contextHolder] = notification.useNotification();

  const { Text } = Typography;
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
            }}></Button>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => {
              clickDeleteData(record);
            }}></Button>
        </ButtonGroup>
      ),
    },
  ];

  const [mainData, setMainData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [search, setSearch] = useState("");
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
      _id: val._id,
      name: val.name,
      email: val.email,
      role: val.role,
    });
    setIsModalOpen(true);
  };
  const handleOk = () => {
    if (formData.type === "add") {
      myAxios
        .post(`${apiUrl}/users`, formData)
        .then((res) => {
          setMainData((prev) => [...prev.reverse(), res.data.data].reverse());
          api.success({
            message: `Амжилттай`,
            description: `Шинэ хэрэглэгч амжилттай хадгалагдлаа!`,
            placement: "topRight",
          });
        })
        .catch((err) => {
          api.error({
            message: `Амжилтгүй`,
            description: `${err}!`,
            placement: "topRight",
          });
        });
    } else {
      myAxios
        .put(`${apiUrl}/users/${formData._id}`, formData)
        .then((res) => {
          setMainData((prev) =>
            prev.map((dt) => {
              if (dt._id === res.data.data._id) {
                return formData;
              } else {
                return dt;
              }
            })
          );
          api.info({
            message: `Амжилттай`,
            description: `Хэрэглэгчийн мэдээлэл амжилттай солив!`,
            placement: "topRight",
          });
        })
        .catch((err) => {
          api.error({
            message: `Амжилтгүй`,
            description: `${err}!`,
            placement: "topRight",
          });
        });
    }
    setIsModalOpen(false);
  };
  const clickDeleteData = (val) => {
    console.log("delete", val);
    myAxios
      .delete(`${apiUrl}/users/${val._id}`)
      .then((res) => {
        setMainData((prev) =>
          prev.filter((dt) => dt._id !== res.data.data._id)
        );
        api.warning({
          message: `Амжилттай`,
          description: `Хэрэглэгчийн мэдээлэл амжилттай устгалаа!`,
          placement: "topRight",
        });
      })
      .catch((err) => {
        api.error({
          message: `Амжилтгүй`,
          description: `${err}!`,
          placement: "topRight",
        });
      });
  };
  useEffect(() => {
    myAxios
      .get(`${apiUrl}/users`)
      .then((res) => {setMainData(res.data.data); setTableData(res.data.data)})
      .catch((err) => {
        console.log(err);
      });
  }, []);
  
  //search hiih heseg
  useEffect(() => {
    let tempArr = mainData.filter((dt) => {
      if (
        dt.name.toUpperCase().indexOf(search.toUpperCase()) !== -1 ||
        dt.email.toUpperCase().indexOf(search.toUpperCase()) !== -1 
      ) {
        return dt;
      }
    });
    setTableData(tempArr);
  }, [search]);
  return (
    <div>
      {contextHolder}
      <Modal
        title="Хэрэглэгчийн мэдээлэл"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}>
        <Row gutter={16}>
          <Col span={12}>
            <Text type="secondary">Хэрэглэгчийн нэр</Text>
            <Input
              value={formData.name}
              onChange={(e) => handleFormData("name", e.target.value)}
            />
          </Col>
          <Col span={12}>
            <Text type="secondary">Имэйл хаяг</Text>
            <Input
              value={formData.email}
              onChange={(e) => handleFormData("email", e.target.value)}
            />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Text type="secondary">Хандах эрх</Text>
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
          {formData.type === "add" && (
            <Col span={12}>
              <Text type="secondary">Нууц үг</Text>
              <Input
                value={formData.password}
                onChange={(e) => handleFormData("password", e.target.value)}
              />
            </Col>
          )}
        </Row>
      </Modal>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}>
        <Input placeholder="Хайлт" value={search} onChange={(e)=>{setSearch(e.target.value)}} style={{ width: "500px" }} />
        <Button type="primary" onClick={() => clickSaveData()}>
          Нэмэх
        </Button>
      </div>
      <Table dataSource={tableData} columns={columns} />
    </div>
  );
};

export default Users;
