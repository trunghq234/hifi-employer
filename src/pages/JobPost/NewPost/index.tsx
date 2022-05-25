import JobPostForm from "@/components/JobPosting/JobPostForm";
import { LeftOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Card } from "antd";
import React from "react";
import { Link, useLocation } from "react-router-dom";

type Props = {};

const NewPostPage = (props: Props) => {
  const location = useLocation();
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
            Back
          </Button>
        </Link>
        <h2 className="font-bold text-xl text-center my-2">Post new job</h2>
      </div>
      <JobPostForm />
    </Card>
  );
};

export default NewPostPage;
