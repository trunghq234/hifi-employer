import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { authActions } from "@/store/reducers/authSlice";
import { selectUser } from "@/store/selectors";
import notificationSocket from "@/utils/notificationSocket";
import {
  BellOutlined,
  NotificationOutlined,
  UserOutlined,
  WechatOutlined,
} from "@ant-design/icons";
import { Avatar, Badge, Button, Col, Popover, Row } from "antd";
import React, { useEffect } from "react";
import Content from "./Content";
import Notifications from "./Notifications";
import Title from "./Title";

const RightContent = () => {
  const avatarUrl = "https://joeschmoe.io/api/v1/random";
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      notificationSocket.connect();
      notificationSocket.emit("joinNotification", {
        receiver: user?._id,
      });
    }
  }, [user]);

  useEffect(() => {
    notificationSocket.on("receiveNotification", (user) => {
      dispatch(authActions.setUser(user));
    });
  }, [notificationSocket]);

  return (
    <Row gutter={[20, 10]}>
      <Col>
        <Button type="link" icon={<WechatOutlined />} href="/chatting"></Button>
      </Col>
      <Col>
        <Popover placement="bottomRight" content={<Notifications />} trigger="hover">
          <Badge count={user?.notifications.length} size="small">
            <BellOutlined style={{ fontSize: 24 }} />
          </Badge>
        </Popover>
      </Col>
      <Col>
        <Popover placement="bottomRight" content={<Content />} title={<Title />} trigger="hover">
          <Avatar
            style={{ cursor: "pointer" }}
            shape="square"
            src={user?.images[0] ? user.images[0] : avatarUrl}
          />
        </Popover>
      </Col>
    </Row>
  );
};

export default RightContent;
