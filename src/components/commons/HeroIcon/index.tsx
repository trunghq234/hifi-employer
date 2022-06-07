import React from "react";
import * as OutlineIcons from "@heroicons/react/outline";
import * as SolidIcons from "@heroicons/react/solid";

type Props = {
  icon: String;
  outline?: boolean;
  style?: Object;
  className?: string;
};

const HeroIcon = (props: Props): JSX.Element => {
  const { icon, outline = false, style = {}, className = "" } = props;

  const { ...icons } = outline ? OutlineIcons : SolidIcons;
  // @ts-ignore
  const Icon: JSX.Element = icons[icon];

  const styles = {
    width: "20px",
    ...style,
  };
  // @ts-ignore
  return <Icon style={styles} className={className} />;
};

export default HeroIcon;
