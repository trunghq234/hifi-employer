import ChatBox from "@/components/Chatting/ChatBox";
import SideNav from "@/components/Chatting/SideNav";
import { Card, Col, Drawer, Row } from "antd";
import React, { useState } from "react";

const Chatting = () => {
  const [visible, setVisible] = useState(false);

  const handleClose = () => {
    setVisible(false);
  };

  const handleSetVisible = () => {
    setVisible(true);
  };

  return (
    <div className="h-4/5">
      <h1 className="text-blue-600 text-2xl">Chats</h1>
      <Card className="h-full" bodyStyle={{ height: "100%" }}>
        <Row className="h-full">
          <Drawer visible={visible} placement="right" closable={false} onClose={handleClose}>
            <SideNav></SideNav>
          </Drawer>
          <Col
            xs={0}
            sm={0}
            md={6}
            className="p-3 border-r-2 border-y-0 border-l-0 border-solid border-indigo-500">
            <SideNav></SideNav>
          </Col>
          <Col xs={24} sm={24} md={18}>
            <ChatBox setVisibleDrawer={handleSetVisible}></ChatBox>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Chatting;
