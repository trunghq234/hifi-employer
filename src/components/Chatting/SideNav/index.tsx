import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { SearchOutlined } from "@ant-design/icons";
import { Input, Typography } from "antd";
import React, { FC, useEffect, useState } from "react";
import roomApi from "../../../api/roomApi";
import socket from "@/utils/messageSocket";
import ChatUserItem from "./ChatUserItem";
import styles from "./index.module.less";
import { Room } from "@/types";
import { setRoomsState } from "@/store/reducers/chattingSlices";
const { Title } = Typography;

interface IProps {}

const SideNav: FC<IProps> = (props) => {
  const userId = "6255931ff19b3638879e3303";
  const [rooms, setRooms] = useState<Room[]>([]);
  const [currentroom, setCurrentRoom] = useState<Room>();
  const dispatch = useAppDispatch();
  const [roomId, setRoomId] = useState<string>();
  const chatting = useAppSelector((state) => state.chatting);

  useEffect(() => {
    socket.on("sendRoom", (data: Room) => {
      setCurrentRoom(data);
      setRoomId(data._id);
    });
  }, [socket]);

  useEffect(() => {
    roomApi
      .getRoomsByUserId(userId)
      .then((res) => {
        setRooms(res.data.value);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (currentroom) {
      dispatch(setRoomsState(currentroom));
    }
  }, [currentroom]);

  useEffect(() => {
    if (chatting.room) {
      let newRooms = rooms.map((room) => (room._id === chatting.room?._id ? chatting.room : room));
      setRooms(newRooms);
    }
  }, [chatting]);

  return (
    <>
      <Title level={3}>Chats</Title>
      <Input
        prefix={<SearchOutlined />}
        placeholder="Search or start new chat"
        className={styles["search-input"]}></Input>
      {rooms.map((room) => {
        return (
          <ChatUserItem
            lastMessage={room.messages[room.messages.length - 1]}
            key={room._id}
            roomId={room._id}
            user={room.chatters[0]}
            selected={room._id === roomId}
          />
        );
      })}
    </>
  );
};

export default SideNav;
