import ChatBox from "@/components/Chatting/ChatBox";
import SideNav from "@/components/Chatting/SideNav";
import { Col, Drawer, Row } from "antd";
import React, { useState } from "react";
import styles from "./index.module.less";

const Chatting = () => {
  const [visible, setVisible] = useState(false);

  const handleClose = () => {
    setVisible(false);
  };

  const handleSetVisible = () => {
    setVisible(true);
  };

  return (
    <Row className={styles.container}>
      <Drawer visible={visible} placement="right" closable={false} onClose={handleClose}>
        <SideNav></SideNav>
      </Drawer>
      <Col xs={0} sm={0} md={6} className={styles["side-nav"]}>
        <SideNav></SideNav>
      </Col>
      <Col xs={24} sm={24} md={18}>
        <ChatBox setVisibleDrawer={handleSetVisible}></ChatBox>
      </Col>
    </Row>
  );
};

export default Chatting;
