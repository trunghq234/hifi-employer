import { Avatar, Col, Divider, Row, Tooltip, Typography } from "antd";
import moment from "moment";
import React, { FC } from "react";
import socket from "@/utils/messageSocket";
import styles from "./index.module.less";
import { User, Message, Chatter } from "@/types";
import { useAppSelector } from "@/store/hooks";
import { selectUser } from "@/store/selectors";

interface IProps {
  lastMessage: Message;
  roomId: string;
  chatter: Chatter;
  selected: boolean;
}

const ChatUserItem: FC<IProps> = (props) => {
  const { chatter, roomId, lastMessage, selected } = props;
  const user = useAppSelector(selectUser);

  const handleJoinRoom = () => {
    socket.emit("fetchRoom", roomId);
  };

  return (
    <>
      <Row
        className={[styles.container, selected && styles.selected].join(" ")}
        onClick={handleJoinRoom}>
        <Col span={5} className={styles.col}>
          <Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" size={"large"} />
        </Col>
        <Col span={19}>
          <Typography.Title level={5} className={styles.title}>
            {chatter?.name}
          </Typography.Title>
          <Row>
            <Typography.Text ellipsis={true} className={styles.text}>
              {user?._id === lastMessage.userId ? "You: " : ""}
              {lastMessage.content}
            </Typography.Text>
          </Row>
          <Row>
            <Tooltip title={moment(lastMessage.createdAt).format("YYYY-MM-DD HH:mm:ss")}>
              <Typography.Text className={styles.time}>
                {moment(lastMessage.createdAt).fromNow()}
              </Typography.Text>
            </Tooltip>
          </Row>
        </Col>
      </Row>
      <Divider style={{ margin: "12px 0" }}></Divider>
    </>
  );
};

export default ChatUserItem;
