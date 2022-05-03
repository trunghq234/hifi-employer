import { validateMessages } from "@/constants/validateMessages";
import { Button, Col, Form, Input, Row } from "antd";
import React, { useMemo, useState } from "react";
import _debounce from "lodash.debounce";
import validationApi from "@/api/validationApi";
import axios from "axios";
const layout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 17 },
};
type Props = {
  onNext?: (data: any) => void;
};
const defaultFormValue = {
  email: "",
  password: "",
  confirmPassword: "",
};

const AccountInfoForm = ({ onNext }: Props) => {
  const [form] = Form.useForm();
  const [isEmailValidating, setIsEmailValidating] = useState(false);
  const checkEmailUsed = useMemo(
    () =>
      _debounce(async (email: string) => {
        try {
          setIsEmailValidating(true);
          await validationApi.checkEmail(email);
        } catch (error: any) {
          let errMessage = "";
          if (axios.isAxiosError(error)) {
            errMessage = error.response?.data.message;
          } else {
            errMessage = error.message;
          }
          form.setFields([
            {
              name: "email",
              errors: [errMessage],
              validating: true,
            },
          ]);
        }
        setIsEmailValidating(false);
      }, 1000),
    [],
  );

  const handleSubmit = (data: any) => {
    onNext?.(data);
  };

  return (
    <Form
      {...layout}
      form={form}
      labelAlign="left"
      onFinish={handleSubmit}
      validateMessages={validateMessages}
      initialValues={defaultFormValue}
      onFieldsChange={(changedFields) => {
        changedFields.forEach((f) => {
          if ((f.name as string[]).includes("email") && f.errors?.length === 0) {
            checkEmailUsed(f.value);
          }
        });
      }}>
      <Row className="h-full">
        <h5 className="text-base font-bold mb-2 text-center">Account</h5>
        <Col span={24}>
          <Form.Item
            label="Email"
            name="email"
            validateFirst={true}
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
      </Row>
      <div className="flex justify-end w-full">
        <Button size="large" htmlType="submit" disabled={isEmailValidating}>
          Next Step
        </Button>
      </div>
    </Form>
  );
};

export default AccountInfoForm;