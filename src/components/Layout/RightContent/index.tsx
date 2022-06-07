import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { authActions } from "@/store/reducers/authSlice";
import { selectUser } from "@/store/selectors";
import notificationSocket from "@/utils/notificationSocket";
import { BellFilled, WechatOutlined } from "@ant-design/icons";
import { Avatar, Badge, Button, Col, Popover, Row, Tooltip } from "antd";
import { useEffect } from "react";
import Content from "./Content";
import Notifications from "./Notifications";
import Title from "./Title";

const RightContent = () => {
  const avatarUrl = "https://joeschmoe.io/api/v1/random";
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      notificationSocket.emit("joinNotification", {
        receiver: user?._id,
      });
    }
  }, [user]);

  useEffect(() => {
    notificationSocket.emit("joinNotification", {
      receiver: "627784b7a8dfd63eec4a8ca1",
    });
  }, []);

  useEffect(() => {
    notificationSocket.on("receiveNotification", (user) => {
      dispatch(authActions.setUser(user));
    });
  }, [notificationSocket]);

  return (
    <Row gutter={[20, 10]}>
      <Col>
        <Tooltip title="Chatting">
          <Button type="link" icon={<WechatOutlined />} href="/chatting"></Button>
        </Tooltip>
      </Col>
      <Col>
        <Popover placement="bottomRight" content={<Notifications />} trigger="hover">
          <Badge
            count={user?.notifications.filter((notification) => !notification.isRead).length}
            size="small">
            <Button type="link" icon={<BellFilled />} />
          </Badge>
        </Popover>
      </Col>
      <Col>
        <Popover placement="bottomRight" content={<Content />} title={<Title />} trigger="hover">
          <Avatar
            style={{ cursor: "pointer" }}
            shape="square"
            src={user?.logo ? user.logo : avatarUrl}
          />
        </Popover>
      </Col>
    </Row>
  );
};

export default RightContent;
