import CompanyIndustriesSelect from "@/components/Register/CompanyIndustriesSelect";
import { validateMessages } from "@/constants/validateMessages";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { authActions } from "@/store/reducers/authSlice";
import { selectUser } from "@/store/selectors";
import socket from "@/utils/messageSocket";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  QuestionCircleTwoTone,
  SyncOutlined,
} from "@ant-design/icons";
import { unwrapResult } from "@reduxjs/toolkit";
import { Button, Col, Form, Input, message, Row, Select, Tag, Tooltip } from "antd";
import { PresetColorType, PresetStatusColorType } from "antd/lib/_util/colors";
import { LiteralUnion } from "antd/lib/_util/type";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import WorkAddressInput from "../WorkAddressInput";

const { TextArea } = Input;
const { Option } = Select;

const accountStatusMap = new Map<
  string,
  {
    color: LiteralUnion<PresetColorType | PresetStatusColorType, string>;
    text: string;
    icon?: JSX.Element;
  }
>([
  [
    "pending",
    {
      color: "processing",
      text: "Pending approval",
      icon: <SyncOutlined spin />,
    },
  ],
  [
    "fullfilled",
    {
      color: "green",
      text: "Approved",
      icon: <CheckCircleOutlined />,
    },
  ],
  [
    "rejected",
    {
      color: "error",
      text: "Rejected",
      icon: <CloseCircleOutlined />,
    },
  ],
  [
    "deleted",
    {
      color: "error",
      text: "Disabled",
      icon: <CloseCircleOutlined />,
    },
  ],
]);

const companySizeOptions: string[] = [
  "Less than 10",
  "10-50",
  "50-100",
  "100-500",
  "500-1000",
  "1000+",
];

const EditProfile = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const userState = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const accoutStatus = userState?.accountStatus || "pending";

  const defaultFormValue = {
    name: userState?.name,
    size: userState?.size,
    industries: userState?.industries,
    contactName: userState?.contactName,
    phoneNumber: userState?.phoneNumber,
    locations: userState?.locations,
    summary: userState?.summary,
  };

  const handleSubmit = () => {
    setIsLoading(true);
    const formData = form.getFieldsValue();
    dispatch(authActions.updateCompany({ idCompany: userState?._id, company: formData }))
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

  const handleSupport = () => {
    socket.connect();
    socket.emit("joinRoomByChatterId", {
      admin: "627784b7a8dfd63eec4a8ca1",
      company: userState?._id,
    });

    navigate("/chatting");
  };

  return (
    <Form
      form={form}
      layout="vertical"
      labelAlign="left"
      onFinish={handleSubmit}
      validateMessages={validateMessages}
      initialValues={defaultFormValue}>
      <Row gutter={[20, 0]} justify="center">
        <Col span={24}>
          <Row justify="space-between">
            <h5 className="text-lg font-semibold">Company information</h5>
            <Tooltip title="Contact admin">
              <Button
                type="primary"
                shape="circle"
                icon={<QuestionCircleTwoTone />}
                onClick={handleSupport}
              />
            </Tooltip>
          </Row>
        </Col>
        <Col span={24} className="!mb-2 flex items-center">
          <p className="!mb-0 mr-2">Account Status:</p>
          <Tag
            icon={accountStatusMap.get(accoutStatus)?.icon}
            color={accountStatusMap.get(accoutStatus)?.color}>
            {accountStatusMap.get(accoutStatus)?.text}
          </Tag>
        </Col>
        <Col span={24}>
          <Form.Item name="name" label="Company name" rules={[{ required: true }]}>
            <Input placeholder="Company Name" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="size" label="Size of company" rules={[{ required: true }]}>
            <Select placeholder="Choose size">
              {companySizeOptions.map((option) => (
                <Option key={option}>{option}</Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={16}>
          <Form.Item name="industries" label="Company industries" rules={[{ required: true }]}>
            <CompanyIndustriesSelect />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            label={
              <>
                <span
                  style={{
                    color: "#ff4d4f",
                    fontSize: "14px",
                    marginRight: "4px",
                    fontFamily: "SimSun",
                  }}>
                  *
                </span>
                Work location
              </>
            }
            rules={[{ required: true }]}>
            <WorkAddressInput />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item name="summary" label="Summary">
            <TextArea rows={4} />
          </Form.Item>
        </Col>
        <Col span={24}>
          <h5 className="text-lg font-semibold">Contact person</h5>
        </Col>
        <Col span={18}>
          <Form.Item name="contactName" label="Contact person's name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            name="phoneNumber"
            label="Phone number"
            rules={[
              {
                validator: (rule, value) => {
                  if (value && !/^\d{10}$/.test(value)) {
                    return Promise.reject("Phone number must be 10 digits");
                  }
                  return Promise.resolve();
                },
              },
            ]}
            required={false}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item>
            <Button type="primary" block size="large" htmlType="submit" loading={isLoading}>
              Submit
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default EditProfile;
