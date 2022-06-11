import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import { RcFile } from "antd/lib/upload";
import { UploadFile } from "antd/lib/upload/interface";
import React, { useState } from "react";

interface AvatarUploadProps {
  value?: RcFile[];
  onChange?: (value: RcFile[]) => void;
}

const AvatarUpload: React.FC<AvatarUploadProps> = ({ value, onChange }) => {
  const [imageFiles, setImageFiles] = useState<RcFile[]>([]);
  const onRemove = (file: UploadFile<unknown>) => {
    if (!value) return;
    const index = value.findIndex((f) => f.uid === file.uid);
    const newFileList = value.slice();
    newFileList.splice(index, 1);
    setImageFiles((prevFiles) => {
      const index = prevFiles.findIndex((f) => f.uid === file.uid);
      const newFileList = prevFiles.slice();
      newFileList.splice(index, 1);
      return newFileList;
    });
    onChange?.(newFileList);
  };
  const beforeUpload = (file: RcFile) => {
    const isImage = file.type.startsWith("image");
    if (!isImage) {
      message.error(`${file.name} is not a png file`);
      return;
    }
    if (value) value = [];
    setImageFiles([file]);
    onChange?.([file]);
    return false;
  };

  return (
    <Upload
      name="file"
      fileList={value || imageFiles}
      beforeUpload={beforeUpload}
      onRemove={onRemove}>
      <Button icon={<UploadOutlined />}>Click to upload</Button>
    </Upload>
  );
};

export default AvatarUpload;
