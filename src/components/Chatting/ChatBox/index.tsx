import { useAppSelector } from "@/store/hooks";
import { Room } from "@/types";
import { MessageOutlined } from "@ant-design/icons";
import { Button, Col, Row, Typography } from "antd";
import React, { FC, useEffect, useState } from "react";
import ChatBoxContent from "./ChatBoxContent";
import ChatBoxHeader from "./ChatBoxHeader";
import ChatBoxInput from "./ChatBoxInput";
import styles from "./index.module.less";

interface IProps {
  setVisibleDrawer: Function;
}

const ChatBox: FC<IProps> = (props) => {
  const { setVisibleDrawer } = props;
  const chatting = useAppSelector((state) => state.chatting);
  const [room, setRoom] = useState<Room>();

  useEffect(() => {
    if (chatting) {
      setRoom(chatting.currentRoom);
    }
  }, [chatting]);

  return (
    <div className={styles.container}>
      {room ? (
        <>
          <ChatBoxHeader
            setVisibleDrawer={setVisibleDrawer}
            chatter={room.chatters[0]}></ChatBoxHeader>
          <ChatBoxContent />
          <ChatBoxInput roomId={room._id}></ChatBoxInput>
        </>
      ) : (
        <div className={styles.welcome}>
          <Typography.Title>🙂 Select user to chat</Typography.Title>
          <Row>
            <Col md={0} sm={24} xs={24}>
              <Button
                size="large"
                shape="circle"
                type="primary"
                icon={<MessageOutlined />}
                onClick={() => {
                  setVisibleDrawer();
                }}></Button>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
