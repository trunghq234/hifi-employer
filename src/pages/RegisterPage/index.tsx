import RegisterForm from "@/components/Register/RegisterForm";
import SideBar from "@/components/SideBar";
import { Col, Row } from "antd";

type Props = {};

const RegisterPage = (props: Props) => {
  return (
    <Row className="rounded-md">
      <Col span={8}>
        <SideBar />
      </Col>
      <Col span={16}>
        <RegisterForm />
      </Col>
    </Row>
  );
};

export default RegisterPage;
