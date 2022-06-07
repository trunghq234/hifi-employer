import { validateMessages } from "@/constants/validateMessages";
import { Button, Col, Form, Input, message, Row } from "antd";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import _debounce from "lodash.debounce";
import validationApi from "@/api/validationApi";
import axios from "axios";
import emailApi from "@/api/emailApi";
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
  const [emailIsValid, setEmailIsvalid] = useState(false);
  const [loading, setLoading] = useState(false);

  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;

    return () => {
      mounted.current = false;
    };
  }, []);

  const checkEmailUsed = useMemo(
    () =>
      _debounce(async (email: string) => {
        try {
          mounted.current && setIsEmailValidating(true);
          await validationApi.checkEmail(email);
          mounted.current && setEmailIsvalid(true);
        } catch (error: any) {
          let errMessage = "";
          mounted.current && setEmailIsvalid(false);
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
        mounted.current && setIsEmailValidating(false);
      }, 1000),
    [],
  );

  const handleSubmit = (data: any) => {
    if (!emailIsValid) return;
    if (data.email) {
      setLoading(true);
      emailApi
        .sendEmailVerification(data.email)
        .then(() => {
          message.success("Email sent to verify account");
          onNext?.(data);
        })
        .catch(() => {
          message.error("Error sending email to verify account");
        })
        .finally(() => {
          setLoading(false);
        });
    }
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
        <Button
          size="large"
          htmlType="submit"
          disabled={!emailIsValid || isEmailValidating}
          loading={loading}>
          Next Step
        </Button>
      </div>
    </Form>
  );
};

export default AccountInfoForm;
