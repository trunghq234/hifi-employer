import { Select } from "antd";
import React from "react";
import Label from "../Label";
const { Option } = Select;

interface IProps {
  value?: string[];
  onChange?: (value: string[]) => void;
}
const options = ["Full-time", "Part-time", "Internship", "Freelancer", "Seasonal", "Other"];
const JobTypeSelect: React.FC<IProps> = (props) => {
  const { value, onChange } = props;
  return (
    <div>
      <Label text="Job type" requiredMark />
      <Select
        allowClear
        style={{ width: "100%" }}
        placeholder="Please select"
        size="large"
        value={value}
        onChange={onChange}>
        {options.map((opt) => (
          <Option key={opt}>{opt}</Option>
        ))}
      </Select>
    </div>
  );
};

export default JobTypeSelect;
