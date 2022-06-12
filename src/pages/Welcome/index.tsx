import { Card, Col, Image, Row } from "antd";
import React from "react";
import HeroImage from "@/assets/images/hero.png";

const Welcome = () => {
  return (
    <Card className="h-full ">
      <Row className="h-full" justify="center">
        <Col span={24}>
          <h2 className="text-2xl text-blue-600">Welcome to Hifi Recruitment Platform</h2>
          <h5 className="text-base text-slate-700">Find your future! Hire your future!</h5>
        </Col>
        <Col span={10}>
          <Image src={HeroImage} alt="logo" height={"100%"} preview={false} />
        </Col>
      </Row>
    </Card>
  );
};

export default Welcome;
