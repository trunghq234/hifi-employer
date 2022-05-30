import HeroIcon from "@/components/commons/HeroIcon";
import React from "react";

type Props = {
  iconName: string;
  content: string;
  outline?: boolean;
};

const DescriptionItem = (props: Props) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <HeroIcon
        icon={props.iconName}
        outline={props.outline ? props.outline : false}
        style={{ marginRight: "20px" }}
      />
      {props.content}
    </div>
  );
};
export default DescriptionItem;
