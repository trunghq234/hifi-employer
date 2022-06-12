import React from "react";
import { Avatar as AntAvatar, AvatarProps } from "antd";
import { stringToHslColor } from "@/utils/color";
import { AvatarSize } from "antd/lib/avatar/SizeContext";
type Props = {
  size?: AvatarSize;
  src?: string;
  text?: string;
} & AvatarProps;

const Avatar: React.FC<Props> = ({ size, src, text, style, ...others }) => {
  const isLetterAvatar = !!(src && text);
  return (
    <AntAvatar
      size={size}
      src={src}
      style={{
        cursor: "pointer",
        ...(isLetterAvatar && { backgroundColor: stringToHslColor(text || "") }),
        ...style,
      }}
      shape="square"
      {...others}>
      {text?.slice(0, 1)}
    </AntAvatar>
  );
};

export default Avatar;
