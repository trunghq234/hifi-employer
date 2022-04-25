import { WorkLocation } from "@/types";
import { Input, Select, Space } from "antd";
import React from "react";
import citiesData from "../cities.json";
type Props = {
  value?: Partial<WorkLocation>;
  onChange?: (value: Partial<WorkLocation>) => void;
};
const { Option } = Select;
type ChangeType = keyof WorkLocation;
const WorkLocationInput: React.FC<Props> = (props) => {
  const { value = {}, onChange } = props;
  console.log(value);
  const handleChange = (type: ChangeType, newValue: any) => {
    console.log("newValue:", newValue);
    console.log("newValue:", value);
    if (!value) return;
    console.log("Adress:", value);
    onChange?.({ ...value, [type]: newValue });
  };
  return (
    <div className="flex ">
      <Select
        placeholder="City/Province"
        className="!w-5/12 mr-2"
        onChange={(value) => handleChange("city", value)}>
        {citiesData.map((option) => (
          <Option key={option.name}>{option.name}</Option>
        ))}
      </Select>
      <Input
        className="w-full"
        placeholder="Address"
        onChange={(value) => handleChange("address", value.target.value)}
      />
    </div>
  );
};

export default WorkLocationInput;
