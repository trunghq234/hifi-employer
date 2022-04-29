import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { authActions } from "@/store/reducers/authSlice";
import { selectUser } from "@/store/selectors";
import { unwrapResult } from "@reduxjs/toolkit";
import { Button, Col, Form, Input, message, Radio, Row } from "antd";
import React, { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";

const defaultFormValue = {
  email: "",
  password: "",
};

export type FromLocation = {
  from: Location;
};
const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const from = (location.state as FromLocation)?.from?.pathname || "/";

  if (user) {
    return <Navigate to={from} replace />;
  }

  const handleLogin = async ({ email, password }: any) => {
    setLoading(true);
    try {
      const result = await dispatch(authActions.login({ email, password }));
      await unwrapResult(result);

      message.success("Login successfully");
      navigate(from, { replace: true });
    } catch (errorLogin: any) {
      message.error(errorLogin.message);
      setLoading(false);
    }
  };
  const onFinishFailed = (data: any) => {
    console.log("Errror: ", data);
  };

  return (
    <div className="bg-white-color h-screen overflow-auto">
      <Row justify="center" align="middle" className="h-full">
        <Form
          onFinish={handleLogin}
          layout="vertical"
          onFinishFailed={onFinishFailed}
          // validateMessages={validateMessages}
          initialValues={defaultFormValue}
          validateTrigger={"onBlur"}>
          <div className="mb-8">
            <p className="text-base font-normal mb-1">Welcome back</p>
            <h3 className="text-3xl font-bold">Login to your account</h3>
          </div>

          <Col span={24}>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true }, { type: "email", message: "Invalid email" }]}>
              <Input placeholder="John.snow@gmail.com" type={"email"} />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item label="Password" name="password" rules={[{ required: true }]}>
              <Input placeholder="******" type={"password"} />
            </Form.Item>
          </Col>

          <div className="flex justify-between mb-6">
            <Radio>Remember me</Radio>
            <Link to={"/forgot-password"}>Forgot password</Link>
          </div>

          <div className="flex flex-col justify-between">
            <Button size="large" block className="mb-8" htmlType="submit" loading={loading}>
              Login
            </Button>
          </div>
          <p>
            {"Don't"} have an account? <Link to={"/register"}>Join free today</Link>
          </p>
        </Form>
      </Row>
    </div>
  );
};

export default LoginForm;
