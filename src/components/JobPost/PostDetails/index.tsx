import postApi from "@/api/postApi";
import { Post, Skill } from "@/types";
import { CheckOutlined, CloseOutlined, LeftOutlined } from "@ant-design/icons";
import { Button, Card, Col, Divider, notification, Row, Tag, Tooltip } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import DescriptionItem from "../DescriptionItem";
import styles from "./index.module.less";

type Props = {};

export const PostDetails = (props: Props) => {
  const [data, setData] = useState<Post>();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    let isSubscribed = true;
    const fetchData = async () => {
      try {
        const res = await postApi.getById(id);
        if (res.data.data) {
          isSubscribed && setData(res.data.data);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          error.response?.status === 404 && navigate("/404");
        }
        console.log("error", error);
      }
    };

    fetchData();
    return () => {
      isSubscribed = false;
    };
  }, []);

  return (
    <Card className={styles.container}>
      <Link to={"/job-posts"}>
        <Button icon={<LeftOutlined />} className="my-3">
          Back
        </Button>
      </Link>
      <div className={styles.titleContainer}>
        <div>
          <span className={styles.title}>{data?.title}</span>
        </div>
        <Divider />
      </div>
      <Row>
        <Col span={24}>
          {data?.skillTags.map((element: Skill, i) => (
            <Tag key={i} className={styles.tag}>
              {element.text}
            </Tag>
          ))}
        </Col>
        <Row style={{ marginTop: "10px" }}>
          <div style={{ fontSize: "1rem", marginBottom: "20px" }}>
            <Col span={24}>Netcompany · Ho Chi Minh City, Viet Nam</Col>
            <Col span={24}>On-site · 1 week ago </Col>
          </div>
          <Col span={24}>
            <DescriptionItem
              iconName="CurrencyDollarIcon"
              content={
                data?.salary.negotiable
                  ? "Negotiable"
                  : `${data?.salary.min} - ${data?.salary.max} ${data?.salary.unit}`
              }
              outline={true}
            />
          </Col>
          <Col span={24}>
            <DescriptionItem iconName="BriefcaseIcon" content="FullTime · Senior level" />
          </Col>
          <Col span={24}>
            <DescriptionItem
              iconName="OfficeBuildingIcon"
              content="501-1,000 employees · Software Development"
            />
          </Col>
        </Row>
        <Row className={styles.descriptionContanier}>
          <div dangerouslySetInnerHTML={{ __html: data?.description }}></div>
        </Row>
        <Divider />
      </Row>
    </Card>
  );
};
