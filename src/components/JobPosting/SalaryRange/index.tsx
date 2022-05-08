import { Salary } from "@/types";
import { InputNumber, Select, Space, Switch, Typography } from "antd";
import React from "react";

type Props = {};

const { Title } = Typography;
const { Option } = Select;

interface ISalaryRange {
  value?: Salary;
  onChange?: (value: Salary) => void;
}
type changeType = keyof Salary;

const SalaryRange: React.FC<ISalaryRange> = (props) => {
  const { value, onChange } = props;
  const handleChange = (type: changeType, newValue: any) => {
    if (!value) return;
    onChange?.({ ...value, [type]: newValue });
  };
  return (
    <div>
      <Title level={5}>Salary Range</Title>
      <Space size={"small"}>
        <InputNumber
          addonBefore="From"
          min={0}
          value={value?.min}
          size="large"
          step={value?.unit === "usd" ? 1000 : 1000000}
          onChange={(value) => handleChange("min", value)}
        />
        <InputNumber
          addonBefore="To"
          min={0}
          size="large"
          value={value?.max}
          step={value?.unit === "usd" ? 1000 : 1000000}
          onChange={(value) => handleChange("max", value)}
        />
        <Select
          style={{ width: "auto" }}
          value={value?.unit}
          size="large"
          onChange={(value) => handleChange("unit", value)}>
          <Option value="vnd">VNĐ</Option>
          <Option value="usd">USD</Option>
        </Select>
        <Space className="flex items-center">
          <Switch
            defaultChecked
            checked={value?.negotiable}
            onChange={(value) => handleChange("negotiable", value)}
          />
          <p className="m-auto">Negotiatable</p>
        </Space>
      </Space>
    </div>
  );
};

export default SalaryRange;
