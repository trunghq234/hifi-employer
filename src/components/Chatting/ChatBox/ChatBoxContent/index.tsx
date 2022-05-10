import { useAppDispatch, useAppSelector } from "@/store/hooks";
import React, { FC, useEffect, useState } from "react";
import socket from "@/utils/messageSocket";
import ChatItem from "./ChatItem";
import styles from "./index.module.less";
import { Message, Room } from "@/types";
import { setCurrentRoomState, setRoomsState } from "@/store/reducers/chattingSlices";
import { selectUser } from "@/store/selectors";

interface IProps {}

const ChatBoxContent: FC<IProps> = (props) => {
  const chatting = useAppSelector((state) => state.chatting);
  const [messageList, setMessageList] = useState<Message[]>([]);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (chatting.currentRoom) {
      setMessageList(chatting.currentRoom?.messages);
    }
  }, [chatting]);

  return (
    <div className={styles.container}>
      <div>
        {messageList.map((message, index) => {
          return (
            <ChatItem
              key={index}
              isMine={message.userId === user?._id}
              message={message.content}
              date={message.createdAt}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ChatBoxContent;
