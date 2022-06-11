import { WorkLocation } from "@/types";
import { Select } from "antd";
import React from "react";
import Label from "../Label";
import LocationOption from "./LocationOption";
import OptionLabel from "./OptionLabel";
const { Option } = Select;

interface IProps {
  value?: string[];
  onChange?: (value: string[]) => void;
  options?: WorkLocation[];
}
const WorkLocationSelect: React.FC<IProps> = (props) => {
  const { value, onChange, options } = props;

  return (
    <div>
      <Label text="Working Location" requiredMark />
      <Select
        mode="multiple"
        style={{ width: "100%", borderRadius: 30 }}
        placeholder="select one or more job locations"
        onChange={onChange}
        value={value}
        optionLabelProp="label"
        size="large">
        {options?.map((loca) => (
          <Option
            key={loca._id}
            value={loca._id}
            label={<OptionLabel name={loca.officeName} address={loca.address} />}>
            <LocationOption name={loca.officeName} address={loca.address} />
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default WorkLocationSelect;
