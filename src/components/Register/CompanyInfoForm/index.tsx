import { validateMessages } from "@/constants/validateMessages";
import { Button, Col, Form, Input, Row } from "antd";
import React from "react";

type Props = {};
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 24 },
};
const CompanyInfoForm = (props: Props) => {
  const handleRegister = (data: any) => {};
  return (
    <Form
      {...layout}
      labelAlign="left"
      onFinish={handleRegister}
      validateMessages={validateMessages}>
      <h5 className="text-base font-bold mb-2">Company Information</h5>
      <Row>
        <Col span={24}>
          <Form.Item
            name="name"
            label="Company Name"
            rules={[{ required: true }]}
            required={false}
            className="!mb-2">
            {/* <LabelInput label="Company Name" /> */}
            <Input placeholder="Company Name" />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            name="size"
            label="Size of company"
            rules={[{ required: true }]}
            required={false}
            className="!mb-2">
            <Input placeholder="Size of company" />
          </Form.Item>
        </Col>
        <h5 className="text-base font-bold mb-2">Contact</h5>
        <Col span={24}>
          <Form.Item
            name="contactName"
            label="Contact Person's Name"
            rules={[{ required: true }]}
            required={false}
            className="!mb-2">
            <Input />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            name="phoneNumber"
            label="Phone number"
            rules={[{ required: true }]}
            required={false}
            className="!mb-2">
            <Input />
          </Form.Item>
        </Col>

        <h5 className="text-base font-bold mb-2">Address</h5>
        <Col span={24}>
          <Form.Item
            name="contactName"
            label="Contact Person's Name"
            rules={[{ required: true }]}
            required={false}
            className="!mb-2">
            <Input />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            name="phoneNumber"
            label="Phone number"
            rules={[{ required: true }]}
            className="!mb-2">
            <Input />
          </Form.Item>
        </Col>
        <div className="flex justify-end">
          <Button type="primary" size="large" htmlType="submit">
            Next Step
          </Button>
        </div>
      </Row>
    </Form>
  );
};

export default CompanyInfoForm;
