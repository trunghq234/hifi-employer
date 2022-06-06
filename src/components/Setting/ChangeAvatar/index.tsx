import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { authActions } from "@/store/reducers/authSlice";
import { selectUser } from "@/store/selectors";
import { async } from "@firebase/util";
import { unwrapResult } from "@reduxjs/toolkit";
import { Button, Col, Form, Image, message, Row } from "antd";
import axios from "axios";
import { useState } from "react";
import AvatarUpload from "../AvatarUpload";

const ChangeAvatar = () => {
  const userState = useAppSelector(selectUser);
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState<string>(userState?.logo || "");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    const { photoFile } = form.getFieldsValue();
    const data = new FormData();
    data.append("file", photoFile[0]);
    data.append("upload_preset", "hifi_upload");
    data.append("cloud_name", "hifi");
    axios
      .post("https://api.cloudinary.com/v1_1/hifi/image/upload", data)
      .then((res) => {
        const { url } = res.data;
        setImageUrl(url);
        handleUpdate(url);
      })
      .catch((err) => message.error(err));
  };

  const handleUpdate = (url: string) => {
    dispatch(authActions.updateCompany({ idCompany: userState?._id, company: { logo: url } }))
      .then(unwrapResult)
      .then((data) => {
        message.success("Updated successfully");
      })
      .catch((err: any) => {
        message.error(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <Form layout="vertical" onFinish={handleSubmit} form={form}>
      <Row gutter={[20, 20]} justify="center">
        <Col span={24}>
          <h5 className="text-lg">Company logo</h5>
        </Col>
        <Col span={8}>
          <Image alt="avatar" preview={false} width={200} src={imageUrl} />
        </Col>
        <Col span={16} />
        <Col span={8}>
          <Form.Item
            name="photoFile"
            rules={[{ required: true, message: "Please choose photo of post!" }]}>
            <AvatarUpload />
          </Form.Item>
        </Col>
        <Col span={16} />
        <Col span={8}>
          <Form.Item>
            <Button loading={isLoading} block size="large" htmlType="submit" type="primary">
              Save
            </Button>
          </Form.Item>
        </Col>
        <Col span={16} />
      </Row>
    </Form>
  );
};

export default ChangeAvatar;
