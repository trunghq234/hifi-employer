import React from "react";
import { Avatar, Col, Row } from "antd";
import { useAppSelector } from "@/store/hooks";
import { selectUser } from "@/store/selectors";

const Title = () => {
  const avatarUrl = "https://joeschmoe.io/api/v1/random";
  const user = useAppSelector(selectUser);
  return (
    <div style={{ width: 240 }}>
      <Row gutter={[20, 20]} align="middle">
        <Col span={6}>
          <Avatar size="large" shape="square" src={user?.logo ? user.logo : avatarUrl} />
        </Col>
        <Col span={18}>
          <p style={{ fontSize: "16px", marginBottom: "0" }}>{user?.name}</p>
          <p
            style={{
              color: "rgba(114,132,154,.7)",
              fontSize: "14px",
              marginBottom: "4px",
            }}></p>
        </Col>
      </Row>
    </div>
  );
};

export default Title;
