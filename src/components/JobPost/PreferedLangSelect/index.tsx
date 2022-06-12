import { Select } from "antd";
import React from "react";
import Label from "../Label";
const { Option } = Select;

const options = ["Vietnamese", "English", "Japanese", "Korean", "Chinese", "French"];

interface IProps {
  value?: string[];
  onChange?: (value: string[]) => void;
}
const PreferedLangSelect: React.FC<IProps> = (props) => {
  const { value, onChange } = props;
  return (
    <div>
      <Label text="Preferred Language For Applications" requiredMark={true} />
      <Select
        mode="multiple"
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

export default PreferedLangSelect;
