import { CompassOutlined } from "@ant-design/icons";
import { Space } from "antd";
import React from "react";

type Props = {
  name?: string;
  address?: string;
};

const LocationOption: React.FC<Props> = (props) => {
  const { name, address } = props;
  return (
    <Space size={10} align="center" className="w-full h-10">
      <CompassOutlined className="text-lg" />
      <div className="flex flex-col justify-center">
        <h3 className="!mb-0">{name}</h3>
        <p className="!mb-0">{address}</p>
      </div>
    </Space>
  );
};

export default LocationOption;
