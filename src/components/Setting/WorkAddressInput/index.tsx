import citiesData from "@/constants/cities.json";
import { WorkLocation } from "@/types";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Select } from "antd";
import React from "react";

type Props = {
  value?: Partial<WorkLocation>;
  onChange?: (value: Partial<WorkLocation>) => void;
};

const { Option } = Select;
type ChangeType = keyof WorkLocation;

const WorkAddressInput: React.FC<Props> = (props) => {
  const { value = {}, onChange } = props;
  const handleChange = (type: ChangeType, newValue: any) => {
    if (!value) return;
    onChange?.({ ...value, [type]: newValue });
  };

  return (
    <Form.List
      name="locations"
      rules={[
        {
          validator: async (_, locations) => {
            if (!locations || locations.length < 1) {
              return Promise.reject(new Error("At least 1 location"));
            }
          },
        },
      ]}>
      {(fields, { add, remove }, { errors }) => (
        <>
          {fields.map(({ key, name, ...restField }) => (
            <Row gutter={[20, 12]} key={key} align="stretch">
              <Col span={8}>
                <Form.Item
                  name={[name, "officeName"]}
                  rules={[{ required: true, message: "Office name is required!" }]}>
                  <Input
                    placeholder="Office name"
                    onChange={(value) => handleChange("officeName", value.target.value)}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name={[name, "address"]}
                  rules={[{ required: true, message: "Address is required!" }]}>
                  <Input
                    placeholder="Address"
                    onChange={(value) => handleChange("address", value.target.value)}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  name={[name, "city"]}
                  rules={[{ required: true, message: "City is required!" }]}>
                  <Select
                    placeholder="City/Province"
                    onChange={(value) => handleChange("city", value)}>
                    {citiesData.map((option) => (
                      <Option key={option.name}>{option.name}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={2}>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Col>
            </Row>
          ))}
          <Form.Item>
            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
              Add location
            </Button>
            <Form.ErrorList errors={errors} />
          </Form.Item>
        </>
      )}
    </Form.List>
  );
};

export default WorkAddressInput;

{
  /* <Row gutter={[20, 20]}>
  <Col span={16}>
    <Form.Item label="Address" name="address" noStyle rules={[{ required: true }]}>
      <Input
        className="w-full"
        placeholder="Address"
        onChange={(value) => handleChange("address", value.target.value)}
      />
    </Form.Item>
  </Col>
  <Col span={8}>
    <Form.Item label="City" name="city" noStyle rules={[{ required: true }]}>
      <Select placeholder="City/Province" onChange={(value) => handleChange("city", value)}>
        {citiesData.map((option) => (
          <Option key={option.name}>{option.name}</Option>
        ))}
      </Select>
    </Form.Item>
  </Col>
</Row>; */
}
