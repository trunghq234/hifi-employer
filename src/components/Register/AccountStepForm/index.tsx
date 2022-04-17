import { Col, Form, Input } from "antd";
import React from "react";

type Props = {};

const AccountStepForm = (props: Props) => {
  return (
    <>
      <Col span={24}>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true }, { type: "email", message: "Invalid email" }]}>
          <Input placeholder="John.snow@gmail.com" />
        </Form.Item>
      </Col>

      <Col span={24}>
        <Form.Item label="Password" name="password" rules={[{ required: true }]}>
          <Input placeholder="******" type={"password"} />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item label="Confirm password" name="confirmPassword" rules={[{ required: true }]}>
          <Input placeholder="******" type={"password"} />
        </Form.Item>
      </Col>
    </>
  );
};

export default AccountStepForm;
