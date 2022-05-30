import ChangePassword from "@/components/Setting/ChangePassword";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Card, Tabs } from "antd";
import { FC, useEffect, useState } from "react";

const { TabPane } = Tabs;
type TabPosition = "left" | "right" | "top" | "bottom";

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
                <UserOutlined />
                Profile
              </span>
            }>
            {/* <EditProfile /> */}
          </TabPane>
          <TabPane
            key="2"
            tab={
              <span>
                <LockOutlined />
                Change password
              </span>
            }>
            <ChangePassword />
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default Setting;
