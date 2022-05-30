import postApi from "@/api/postApi";
import { deteteImage, uploadImage } from "@/firebase/services";
import { Post } from "@/types";
import { Button, Col, DatePicker, Form, message, Row } from "antd";
import moment, { isMoment } from "moment";
import { useState } from "react";
import DescriptionRichInput from "../DescriptionRichInput";
import JobCategory from "../JobCategory";
import JobTypeSelect from "../JobTypeSelect";
import Label from "../Label";
import LabelInput from "../LabelInput";
import PreferedLangSelect from "../PreferedLangSelect";
import SalaryRange from "../SalaryRange";
import SkillSearchSelect from "../SkillsSearchInput";
import WorkLocationSelect from "../WorkLocationSelect";

type Props = {
  post: Post;
  changePreviewMode?: (data: any) => void;
};
const layout = {
  wrapperCol: { span: 24 },
};
const defaultFormValue: Partial<Post> = {
  title: "",
  jobType: "",
  jobCategory: "",
  salary: { min: 1000, max: 3000, unit: "usd", negotiable: false },
  description: "",
  skillTags: [],
  preferedLangs: [],
  locations: [],
  photoFile: undefined,
  postPhoto: "",
};

const UpdatePostForm = ({ post: postData, changePreviewMode }: Props) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (post: Post) => {
    setLoading(true);
    try {
      await postApi.updatePost(postData._id, post);
      message.success("Post updated successfully");
    } catch (error: any) {
      message.error(error.message);
    }
    setLoading(false);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  console.log("postData", postData);
  return (
    <Form
      {...layout}
      form={form}
      layout="horizontal"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      initialValues={
        postData
          ? {
              ...postData,
              category: undefined,
              applicationDeadline: postData?.applicationDeadline
                ? isMoment(postData?.applicationDeadline)
                  ? postData?.applicationDeadline
                  : moment(postData?.applicationDeadline)
                : moment(),
            }
          : defaultFormValue
      }>
      <Row gutter={[80, 0]}>
        <Col xs={24} md={12}>
          <Form.Item name="title" rules={[{ required: true, message: "Please input job title!" }]}>
            <LabelInput label="Job title" requiredMark />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item name="jobType" rules={[{ required: true, message: "Please enter job type!" }]}>
            <JobTypeSelect />
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item
            name="jobCategory"
            rules={[{ required: true, message: "Please input job category!" }]}
            initialValue={(postData as Post).jobCategory}>
            <JobCategory />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            name="salary"
            rules={[{ required: true, message: "Please enter description!" }]}>
            <SalaryRange />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            name="description"
            rules={[{ required: true, message: "Please enter job description!" }]}>
            <DescriptionRichInput />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            name="skillTags"
            rules={[{ required: true, message: "Please skill tags for job!" }]}>
            <SkillSearchSelect defaultValues={postData.skillTags} />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            name="preferedLangs"
            rules={[
              { required: true, message: "Please choose one or more prefered languages for job" },
            ]}>
            <PreferedLangSelect />
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Label text="Application deadline" requiredMark={true} />
          <Form.Item
            name="applicationDeadline"
            rules={[{ required: true, message: "Please choose application deadline" }]}>
            <DatePicker size="large" />
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item
            name="locations"
            rules={[{ required: true, message: "Please choose working location of company" }]}>
            <WorkLocationSelect />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <div className="flex justify-between">
          <Button
            size="large"
            className="mr-5 border !rounded"
            onClick={async () => {
              form
                .validateFields()
                .then((values) => {
                  changePreviewMode?.(values);
                })
                .catch((error) => {
                  console.log("error validate fields", error);
                });
            }}>
            Preview mode
          </Button>
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            className="!rounded"
            loading={loading}>
            Update
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default UpdatePostForm;
