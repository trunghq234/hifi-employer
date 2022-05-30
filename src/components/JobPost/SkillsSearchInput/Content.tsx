import React from "react";
import { messageType } from ".";

type Props = {
  messageType?: messageType;
};
const defaultMessage = "Please enter 2 or more characters";

const Content = (props: Props) => {
  const { messageType } = props;
  if (messageType === "Loading") {
    return <p className="!text-sm !m-0">Search...</p>;
  }
  if (messageType === "Default") {
    return <p className="!text-sm !m-0">{defaultMessage}</p>;
  }

  return (
    <p className="!text-sm !m-0">
      Skill not found. To add new skills, please contact
      <a href="mailto:hifi@gmail.com"> hifi@gmail.com</a>
    </p>
  );
};

export default Content;
