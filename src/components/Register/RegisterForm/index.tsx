import { FromLocation } from "@/components/Login/LoginForm";
import { validateMessages } from "@/constants/validateMessages";
import { useAppDispatch } from "@/store/hooks";
import { authActions } from "@/store/reducers/authSlice";
import { Company, WorkLocation } from "@/types";
import { unwrapResult } from "@reduxjs/toolkit";
import { Button, Col, Form, Input, message, Row, Select } from "antd";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CompanyIndustriesSelect from "../CompanyIndustriesSelect";
import WorkLocationInput from "../WorkLocationInput";
const { TextArea } = Input;
const { Option } = Select;
const layout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 17 },
};

const companySizeOptions: string[] = [
  "Less than 10",
  "10-50",
  "50-100",
  "100-500",
  "500-1000",
  "1000+",
];
const defaultFormValue = {
  email: "",
  password: "",
  confirmPassword: "",
  name: "",
  size: "",
  industries: [],
  contactName: "",
  phoneNumber: "",
  location: {} as Partial<WorkLocation>,
  summary: "",
};
const RegisterForm = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const from = (location.state as FromLocation)?.from?.pathname || "/";
  const handleRegister = async (data: typeof defaultFormValue) => {
    data.location.officeName = data.name;
    console.log("COmpany: ", data);
    setLoading(true);

    try {
      const result = await dispatch(authActions.register(data));
      await unwrapResult(result);

      message.success("Register successfully");
      navigate(from, { replace: true });
    } catch (error: any) {
      console.log("Register Error: ", error);
      message.error(error.message);
    }

    setLoading(false);
  };

  return (
    <div className="bg-white-color min-h-screen">
      <div className="h-screen">
        <div className="px-6 lg:px-20 xl:px-36 py-10 min-h-screen">
          <div className="my-1">
            <h3 className="text-3xl font-bold">Sign Up for Employers</h3>
            <p className="text-base font-normal mb-1 my-2">
              Create employer account to get access to our resume database and post your job right
              now
            </p>
          </div>

          <div className="mt-2 w-full">
            <Form
              {...layout}
              labelAlign="left"
              onFinish={handleRegister}
              validateMessages={validateMessages}
              initialValues={defaultFormValue}>
              <Row>
                <h5 className="text-base font-bold mb-2 text-center">Account</h5>
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
                  <Form.Item
                    label="Confirm password"
                    name="confirmPassword"
                    rules={[{ required: true }]}>
                    <Input placeholder="******" type={"password"} />
                  </Form.Item>
                </Col>
                <h5 className="text-base font-bold mb-2 text-center">Company Information</h5>
                <Col span={24}>
                  <Form.Item
                    name="name"
                    label="Company Name"
                    rules={[{ required: true }]}
                    required={false}>
                    {/* <LabelInput label="Company Name" /> */}
                    <Input placeholder="Company Name" />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="size"
                    label="Size of company"
                    rules={[{ required: true }]}
                    required={false}>
                    {/* <Input placeholder="Size of company" /> */}
                    <Select placeholder="Choose size">
                      {companySizeOptions.map((option) => (
                        <Option key={option}>{option}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="industries"
                    label="Company Industries"
                    rules={[{ required: true }]}
                    required={false}>
                    <CompanyIndustriesSelect />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="contactName"
                    label="Contact Person's Name"
                    rules={[{ required: true }]}
                    required={false}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="phoneNumber"
                    label="Phone number"
                    rules={[{ required: true }]}
                    required={false}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="location"
                    label="Work Location"
                    rules={[{ required: true }]}
                    required={false}>
                    <WorkLocationInput />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="summary"
                    label="Summary"
                    rules={[{ required: true }]}
                    required={false}>
                    <TextArea rows={4} />
                  </Form.Item>
                </Col>
                <div className="flex justify-end w-full">
                  <Button loading={loading} size="large" htmlType="submit">
                    Next Step
                  </Button>
                </div>
              </Row>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
