import { useAppDispatch } from "@/store/hooks";
import { authActions } from "@/store/reducers/authSlice";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button } from "antd";
import React from "react";

const RightContent = () => {
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(authActions.logout());
  };
  return (
    <div>
      <Avatar shape="square" size="small" icon={<UserOutlined />} />
      <Button onClick={handleLogout}>Log out</Button>
    </div>
  );
};

export default RightContent;
