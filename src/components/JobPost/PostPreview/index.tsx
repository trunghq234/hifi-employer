import suggestionApi from "@/api/suggestionApi";
import { useAppSelector } from "@/store/hooks";
import { selectUser } from "@/store/selectors";
import { Post, Skill, WorkLocation } from "@/types";
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
  const user = useAppSelector(selectUser);
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
  }, [JSON.stringify(post.skillTags)]);

  useEffect(() => {
    setPost((prev) => ({
      ...prev,
      locations: user?.locations.filter((l) =>
        (post.locations as string[])?.includes(l._id as string),
      ),
    }));
  }, [user?.locations]);

  console.log("Post", post);
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
            <Col span={24}>
              {user?.name} ·{" "}
              {(post?.locations as WorkLocation[])
                ?.map((l) => l.city)
                .filter(function (item, pos, arr) {
                  return arr.indexOf(item) == pos;
                })
                .join(" / ")}{" "}
            </Col>
            <Col span={24}>{post.workplaceType}</Col>
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
            <DescriptionItem
              iconName="BriefcaseIcon"
              content={`${post.jobType?.capitalize()} · ${post.experienceLevel}`}
            />
          </Col>
          <Col span={24}>
            <DescriptionItem
              iconName="OfficeBuildingIcon"
              content={`${user?.size} · Software Development`}
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
