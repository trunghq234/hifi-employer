import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { $chatting, setCurrentRoomState, setRoomsState } from "@/store/reducers/chattingSlices";
import { selectUser } from "@/store/selectors";
import { Room } from "@/types";
import socket from "@/utils/messageSocket";
import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { FC, useEffect, useState } from "react";
import roomApi from "../../../api/roomApi";
import ChatUserItem from "./ChatUserItem";
import styles from "./index.module.less";

interface IProps {}

const SideNav: FC<IProps> = (props) => {
  const user = useAppSelector(selectUser);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [receivedData, setReceivedData] = useState<Room>();
  const [searchName, setSearchName] = useState<string>("");
  const [roomId, setRoomId] = useState<string>();
  const dispatch = useAppDispatch();
  const chatting = useAppSelector($chatting);

  const joinAllRoom = () => {
    socket.connect();

    rooms.forEach((room) => {
      socket.emit("joinRoom", room._id);
    });
  };

  const handleSearch = (value: string) => {
    setSearchName(value);
  };

  useEffect(() => {
    socket.on("sendRoom", (data: Room) => {
      setRoomId(data._id);
      dispatch(setCurrentRoomState(data));
    });
  }, [socket]);

  useEffect(() => {
    roomApi
      .getRoomsByUserId(user?._id!)
      .then((res) => {
        dispatch(setRoomsState(res.data.value));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (chatting.rooms) {
      setRooms(chatting.rooms);
    }
  }, [chatting]);

  useEffect(() => {
    if (rooms.length > 0) {
      joinAllRoom();
    }
  }, [rooms]);

  useEffect(() => {
    socket.on("sendDataServer", (data: Room) => {
      setReceivedData(data);
    });
  }, [socket]);

  useEffect(() => {
    if (receivedData) {
      let newRooms = [...chatting.rooms!];
      const index = newRooms.findIndex((room) => room._id === receivedData?._id);

      if (index != -1) {
        newRooms.splice(index, 1);
      }
      newRooms.unshift(receivedData);

      dispatch(setRoomsState(newRooms));

      if (receivedData?._id === chatting.currentRoom?._id) {
        dispatch(setCurrentRoomState(receivedData));
      }
    }
  }, [receivedData]);

  return (
    <div>
      <Input
        prefix={<SearchOutlined />}
        onChange={(event: any) => handleSearch(event.target.value)}
        placeholder="Search or start new chat"
        className={styles["search-input"]}
      />
      <div className={styles.container}>
        {rooms
          .filter((room) =>
            room.chatters
              .find((chatter) => chatter.chatterId != user?._id)
              ?.name.toLowerCase()
              .includes(searchName.toLowerCase()),
          )
          .map((room) => {
            return (
              <ChatUserItem
                lastMessage={room.messages[room.messages.length - 1]}
                key={room._id}
                roomId={room._id}
                chatter={room.chatters.find((chatter) => chatter.chatterId != user?._id)}
                selected={room._id === roomId}
              />
            );
          })}
      </div>
    </div>
  );
};

export default SideNav;
