import { PlusCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import styles from "./index.module.less";

type Props = {};

const HeaderPost = (props: Props) => {
  return (
    <div className="flex justify-between items-center w-full">
      {/* <Breadcrumb>
        <Breadcrumb.Item>
          <a href="/">Home</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Posts</Breadcrumb.Item>
      </Breadcrumb> */}
      <h2 className={styles.header}>Post list</h2>
      <Link to="new">
        <Button icon={<PlusCircleOutlined />}>Post new job </Button>
      </Link>
    </div>
  );
};

export default HeaderPost;
