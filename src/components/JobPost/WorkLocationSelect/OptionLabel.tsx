import { CompassOutlined } from "@ant-design/icons";
import { Space } from "antd";
import React from "react";

const OptionLabel: React.FC<{ address?: string; name?: string }> = ({ address, name }) => {
  return (
    <Space size={10} className="items-center">
      <CompassOutlined />
      <p className="!mb-0">
        <span className="font-bold">{name}: </span> {address}
      </p>
    </Space>
  );
};

export default OptionLabel;
