import React from "react";
import { Avatar, Col, Row } from "antd";
import { useAppSelector } from "@/store/hooks";
import { selectUser } from "@/store/selectors";

const Title = () => {
  const avatarUrl = "https://joeschmoe.io/api/v1/random";
  const user = useAppSelector(selectUser);
  return (
    <div>
      <Row style={{ alignItems: "center", justifyContent: "center" }}>
        <Col span={4}>
          <Avatar shape="square" src={user?.logo ? user.logo : avatarUrl} />
        </Col>
        <Col span={20}>
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
