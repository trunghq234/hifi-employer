import JobPostForm from "@/components/JobPosting/JobPostForm";
import { Card } from "antd";
import { FC } from "react";

const JobPost: FC = () => {
  return (
    <Card>
      <JobPostForm />
    </Card>
  );
};

export default JobPost;
