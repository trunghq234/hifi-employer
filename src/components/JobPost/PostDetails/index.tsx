import postApi from "@/api/postApi";
import { Post, Skill, Subcategory } from "@/types";
import { LeftOutlined } from "@ant-design/icons";
import { Button, Card, Col, Divider, Row, Spin, Tag } from "antd";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DescriptionItem from "../DescriptionItem";
import styles from "./index.module.less";

type Props = {};

export const PostDetails = (props: Props) => {
  const [data, setData] = useState<Post>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    let isSubscribed = true;
    const fetchData = async () => {
      try {
        setLoading(true);
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

    fetchData().finally(() => {
      isSubscribed && setLoading(false);
    });
    return () => {
      isSubscribed = false;
    };
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin />
      </div>
    );
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
            <Col span={24}>{data?.company.name} · Ho Chi Minh City, Viet Nam</Col>
            <Col span={24}>
              {data?.workplaceType.capitalize()} · {moment(data?.createdAt).fromNow()}
            </Col>
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
            <DescriptionItem
              iconName="BriefcaseIcon"
              content={`${data?.jobType} · ${data?.experienceLevel}`}
            />
          </Col>
          <Col span={24}>
            <DescriptionItem
              iconName="OfficeBuildingIcon"
              content={`${data?.company?.size} · ${(data?.jobCategory as Subcategory)?.name}`}
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
