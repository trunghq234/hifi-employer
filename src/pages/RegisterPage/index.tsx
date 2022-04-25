import RegisterForm from "@/components/Register/RegisterForm";
import SideBar from "@/components/SideBar";
import { Col, Row } from "antd";
import React from "react";
import { Link } from "react-router-dom";

type Props = {};

const RegisterPage = (props: Props) => {
  return (
    <Row className="rounded-md">
      <Col span={6}>
        <SideBar />
      </Col>
      <Col span={18}>
        <RegisterForm />
      </Col>
    </Row>
  );
};

export default RegisterPage;
