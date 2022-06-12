import ChangeAvatar from "@/components/Setting/ChangeAvatar";
import ChangePassword from "@/components/Setting/ChangePassword";
import EditProfile from "@/components/Setting/EditProfile";
import { Card, Tabs } from "antd";
import { FC, useEffect, useState } from "react";
import { HiOutlineLockClosed, HiOutlinePhotograph, HiOutlineUser } from "react-icons/hi";

const { TabPane } = Tabs;
type TabPosition = "left" | "right" | "top" | "bottom";
const iconProps = { color: "#446FFC", size: 20 };

const Setting: FC = () => {
  const [position, setPosition] = useState<TabPosition>("left");
  useEffect(() => {
    if (screen.width < 768) {
      setPosition("top");
    }
  }, []);
  return (
    <div>
      <h1>Setting</h1>
      <Card>
        <Tabs tabPosition={position} moreIcon={<></>}>
          <TabPane
            key="1"
            tab={
              <span>
                <span role={"img"} className="anticon">
                  <HiOutlineUser {...iconProps} />
                </span>
                Profile
              </span>
            }>
            <EditProfile />
          </TabPane>
          <TabPane
            key="2"
            tab={
              <span>
                <span role={"img"} className="anticon">
                  <HiOutlineLockClosed {...iconProps} />
                </span>
                Change password
              </span>
            }>
            <ChangePassword />
          </TabPane>
          <TabPane
            key="3"
            tab={
              <span>
                <span role={"img"} className="anticon">
                  <HiOutlinePhotograph {...iconProps} />
                </span>
                Avatar
              </span>
            }>
            <ChangeAvatar />
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default Setting;
