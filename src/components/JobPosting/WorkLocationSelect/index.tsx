import { Button, Select } from "antd";
import React from "react";
import Label from "../Label";
import LocationOption from "./LocationOption";
import OptionLabel from "./OptionLabel";
import { locationList } from "../data";
const { Option } = Select;

interface IProps {
  value?: string[];
  onChange?: (value: string[]) => void;
}
const WorkLocationSelect: React.FC<IProps> = (props) => {
  const { value, onChange } = props;
  return (
    <div>
      <Label text="Working Location" />
      <Select
        mode="multiple"
        style={{ width: "100%", borderRadius: 30 }}
        placeholder="select one or more job locations"
        onChange={onChange}
        value={value}
        optionLabelProp="label"
        size="large">
        {locationList.map((loca) => (
          <Option
            key={loca.id}
            value={loca.id}
            label={<OptionLabel name={loca.name} address={loca.address} />}>
            <LocationOption name={loca.name} address={loca.address} />
          </Option>
        ))}
      </Select>
      <Button />
    </div>
  );
};

export default WorkLocationSelect;
