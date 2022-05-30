import React, { useState } from "react";
import { Form, Col, Row, Button, Input, notification, message } from "antd";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { authActions } from "@/store/reducers/authSlice";
import { selectUser } from "@/store/selectors";
import { unwrapResult } from "@reduxjs/toolkit";

const ChangePassword = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const authState = useAppSelector(selectUser);

  const handleSubmit = async () => {
    setLoading(true);

    const { currentPassword, newPassword, confirmPassword } = form.getFieldsValue();
    if (newPassword != confirmPassword) {
      notification["error"]({
        message: "Error",
        description: `The confirm password must be the same as the new password `,
      });
      setLoading(false);
      return;
    }
    if (currentPassword == newPassword) {
      notification["error"]({
        message: "Error",
        description: `The new password must be different from the current password `,
      });
      setLoading(false);
      return;
    }
    try {
      const result = await dispatch(
        authActions.updatePassword({
          idCompany: authState?._id,
          password: currentPassword,
          newPassword,
        }),
      );
      unwrapResult(result);

      notification["success"]({
        message: "Successfully",
        description: `Updated successfully `,
      });
    } catch (errorLogin: any) {
      notification["error"]({
        message: "Error",
        description: errorLogin.message,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Form layout="vertical" onFinish={handleSubmit} form={form}>
      <Row>
        <Col xs={24} sm={24} md={10}>
          <Form.Item
            label="Current password"
            name="currentPassword"
            rules={[
              { required: true, message: "Please input your current password!" },
              { min: 6, message: "Password must be minimum 6 characters." },
            ]}>
            <Input.Password />
          </Form.Item>
        </Col>
        <Col md={12} />
        <Col xs={24} sm={24} md={10}>
          <Form.Item
            label="New password"
            name="newPassword"
            rules={[
              { required: true, message: "Please input new password!" },
              { min: 6, message: "Password must be minimum 6 characters." },
            ]}>
            <Input.Password />
          </Form.Item>
        </Col>
        <Col md={12} />
        <Col xs={24} sm={24} md={10}>
          <Form.Item
            label="Confirm password"
            name="confirmPassword"
            rules={[
              { required: true, message: "Please input confirm password!" },
              { min: 6, message: "Password must be minimum 6 characters." },
            ]}>
            <Input.Password />
          </Form.Item>
        </Col>
        <Col md={12} />
        <Col xs={24} sm={24} md={10}>
          <Button block type="primary" htmlType="submit" size="large" loading={loading}>
            Change password
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default ChangePassword;
