import { Space, Typography } from "antd";
import React from "react";

const { Paragraph, Text, Title } = Typography;

interface IProps {
  text: string;
  requiredMark?: boolean;
}
const Label: React.FC<IProps> = (props) => {
  const { text, requiredMark } = props;
  return (
    <Space size={4}>
      <Title level={5}>{text}</Title>
      {requiredMark && <p className="text-red-500 text-base">*</p>}
    </Space>
  );
};

export default Label;
