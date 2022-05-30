import suggestionApi from "@/api/suggestionApi";
import { Post, Skill } from "@/types";
import { LeftOutlined } from "@ant-design/icons";
import { Button, Card, Col, Divider, Row, Tag } from "antd";
import React, { useEffect, useState } from "react";
import DescriptionItem from "../DescriptionItem";
import styles from "./index.module.less";

type Props = {
  post: Partial<Post>;
  changeMode?: () => void;
};

const PostPreview = ({ post: postData, changeMode }: Props) => {
  const [post, setPost] = useState(postData);
  useEffect(() => {
    let isMounted = true;
    const skillTags = postData.skillTags as any as string[];
    if (isMounted && skillTags && skillTags.length !== 0) {
      suggestionApi.getSkills(skillTags).then((tags) => {
        isMounted && setPost((prev) => ({ ...prev, skillTags: tags }));
      });
    }
    return () => {
      isMounted = false;
    };
  }, [post.skillTags]);
  return (
    <Card className={styles.container}>
      <Button
        icon={<LeftOutlined />}
        className="my-3"
        onClick={() => {
          changeMode?.();
        }}>
        Back
      </Button>
      <div className={styles.titleContainer}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <span className={styles.title}>{post?.title}</span>
        </div>
        <Divider />
      </div>
      <Row>
        <Col span={24}>
          {post?.skillTags?.map((element: Skill, i) => (
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
                post?.salary?.negotiable
                  ? "Negotiable"
                  : `${post?.salary?.min ?? 0} - ${post?.salary?.max ?? 0} ${post?.salary?.unit}`
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
          <div dangerouslySetInnerHTML={{ __html: post?.description }}></div>
        </Row>
        <Divider />
      </Row>
    </Card>
  );
};

export default PostPreview;
