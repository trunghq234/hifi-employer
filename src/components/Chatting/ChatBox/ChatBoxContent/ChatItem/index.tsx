import { Avatar, Card, Col, Row, Typography } from "antd";
import React, { FC } from "react";
import styles from "./index.module.less";
import moment from "moment";
import Linkify from "react-linkify";

interface IProps {
  avatar?: string;
  message: string;
  date: string;
  isMine: boolean;
}

const ChatItem: FC<IProps> = (props) => {
  const { isMine, message, date, avatar } = props;

  return (
    <div className={styles.container}>
      <Row align="bottom" wrap={false} className={isMine ? styles["flex-row-reserve"] : ""}>
        <Col>
          <Avatar src={avatar || "https://joeschmoe.io/api/v1/random"} size={"large"} />
        </Col>
        <Col flex="initial">
          <Card className={styles.bubble} bodyStyle={{ padding: "16px" }}>
            <Row justify={isMine ? "end" : "start"}>
              <Typography.Paragraph className={styles.content}>
                <Linkify>{message}</Linkify>
              </Typography.Paragraph>
            </Row>
            <Row>
              <Typography.Text className={styles[`chat-time`]}>
                {moment(date).fromNow()}
              </Typography.Text>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ChatItem;
