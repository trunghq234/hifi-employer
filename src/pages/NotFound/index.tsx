import { Button, Result } from "antd";
import React from "react";

type Props = {};

const NotFoundPage = (props: Props) => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" href="/">
          Back to home
        </Button>
      }
    />
  );
};

export default NotFoundPage;
