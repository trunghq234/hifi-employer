import { Input, InputProps } from "antd";
import React from "react";
import Label from "../Label";

interface IProps extends InputProps {
  label: string;
  requiredMark?: boolean;
}

const LabelInput: React.FC<IProps> = (props) => {
  const { label, requiredMark, ...others } = props;
  return (
    <div>
      <Label text={label} requiredMark={requiredMark} />
      <Input size="large" {...others} />
    </div>
  );
};

export default LabelInput;
