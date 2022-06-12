import Avatar from "@/components/commons/Avatar";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { authActions } from "@/store/reducers/authSlice";
import { selectUser } from "@/store/selectors";
import { stringToHslColor } from "@/utils/color";
import notificationSocket from "@/utils/notificationSocket";
import { BellFilled, WechatOutlined } from "@ant-design/icons";
import { Badge, Button, Col, Popover, Row, Tooltip } from "antd";
import { useEffect } from "react";
import { Link } from "react-router-dom";
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
          <Link to="/chatting">
            <WechatOutlined style={{ fontSize: 18 }} />
          </Link>
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
          <Avatar src={user?.logo} text={user?.name} />
        </Popover>
      </Col>
    </Row>
  );
};

export default RightContent;
