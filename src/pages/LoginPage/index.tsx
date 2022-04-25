import LoginForm from "@/components/Login/LoginForm";
import SideBar from "@/components/SideBar";
import { Col, Row } from "antd";
import React from "react";

type Props = {};

const Loginpage = (props: Props) => {
  return (
    <Row className="rounded-md max-h-screen">
      <Col span={8}>
        <SideBar />
      </Col>
      <Col span={16}>
        <LoginForm />
      </Col>
    </Row>
  );
};

export default Loginpage;
