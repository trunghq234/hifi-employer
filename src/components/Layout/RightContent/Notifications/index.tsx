import React, { FC, useEffect } from "react";
import NotificationItem from "./NotificationItem";
import { useAppSelector } from "@/store/hooks";
import { selectUser } from "@/store/selectors";
import notificationSocket from "@/utils/notificationSocket";
import { Typography } from "antd";

interface IProp {}

const Notifications: FC<IProp> = (props) => {
  const user = useAppSelector(selectUser);

  return (
    <div style={{ width: 300, overflowY: "auto", overflowX: "hidden", maxHeight: 500 }}>
      <Typography.Title style={{ fontSize: "20px" }}>Notifications</Typography.Title>
      {user?.notifications
        .slice(0)
        .reverse()
        .map((notification) => {
          return <NotificationItem key={notification?._id} notification={notification} />;
        })}
    </div>
  );
};

export default Notifications;
