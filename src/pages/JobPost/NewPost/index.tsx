import JobPostForm from "@/components/JobPost/JobPostForm";
import PostPreview from "@/components/JobPost/PostPreview";
import { Post } from "@/types";
import { LeftOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Card } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";

type Props = {};

const NewPostPage = (props: Props) => {
  const [post, setPost] = useState<Partial<Post>>({});
  const [mode, setMode] = useState("new");
  console.log("post", post);
  return (
    <Card className="text-lg text-[#685879]">
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>
            <a href="/job-posts">Job Posts</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Post new job</Breadcrumb.Item>
        </Breadcrumb>
        <Link to={"/job-posts"}>
          <Button icon={<LeftOutlined />} className="my-3">
            Back {mode === "preview" && "to job posts"}
          </Button>
        </Link>
        <h2 className="font-bold text-xl text-center my-2">
          {mode === "new" ? "Post new job" : "Preview post"}
        </h2>
      </div>
      {mode === "new" ? (
        <JobPostForm
          post={post}
          changePreviewMode={(data) => {
            setPost(data);
            setMode("preview");
          }}
          onSuccess={() => {
            setPost({});
          }}
        />
      ) : (
        <PostPreview post={post} changeMode={() => setMode("new")} />
      )}
    </Card>
  );
};

export default NewPostPage;
