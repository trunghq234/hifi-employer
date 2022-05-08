import { validateMessages } from "@/constants/validateMessages";
import { WorkLocation } from "@/types";
import { Button, Col, Form, Input, Row, Select } from "antd";
import React from "react";
import CompanyIndustriesSelect from "../../CompanyIndustriesSelect";
import WorkLocationInput from "../../WorkLocationInput";
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

type Props = {
  loading?: boolean;
  onPrevious?: () => void;
  onNext?: (data: any) => void;
};
const defaultFormValue = {
  name: "",
  size: "",
  industries: [],
  contactName: "",
  phoneNumber: "",
  location: {} as Partial<WorkLocation>,
  summary: "",
};

const CompanyInfoForm = ({ onNext, onPrevious, loading }: Props) => {
  const handleSubmit = async (data: any) => {
    data.lastStep = true;
    onNext?.(data);
  };
  return (
    <Form
      {...layout}
      labelAlign="left"
      onFinish={handleSubmit}
      validateMessages={validateMessages}
      initialValues={defaultFormValue}>
      <Row>
        <h5 className="text-base font-bold mb-2 text-center">Company Information</h5>
        <Col span={24}>
          <Form.Item name="name" label="Company Name" rules={[{ required: true }]} required={false}>
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
          <Form.Item name="summary" label="Summary" rules={[{ required: true }]} required={false}>
            <TextArea rows={4} />
          </Form.Item>
        </Col>
      </Row>
      <div className="flex justify-between w-full">
        <Button size="large" onClick={() => onPrevious?.()}>
          Previous
        </Button>
        <Button size="large" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </div>
    </Form>
  );
};

export default CompanyInfoForm;
