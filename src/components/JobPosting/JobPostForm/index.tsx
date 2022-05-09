import { deteteImage, uploadImage } from "@/firebase/services";
import { Post } from "@/types";
import Utils from "@/utils";
import { Button, Col, Form, message, Row } from "antd";
import postApi from "@/api/postApi";
import React, { useState } from "react";
import DescriptionRichInput from "../DescriptionRichInput";
import ImageFileUpload from "../ImageFileUpload";
import JobCategory from "../JobCategory";
import JobTypeSelect from "../JobTypeSelect";
import LabelInput from "../LabelInput";
import PreferedLangSelect from "../PreferedLangSelect";
import SalaryRange from "../SalaryRange";
import SkillSearchSelect from "../SkillsSearchInput";
import WorkLocationSelect from "../WorkLocationSelect";

type Props = {};
const layout = {
  wrapperCol: { span: 24 },
};
const defaultFormValue: Post = {
  title: "",
  jobType: "",
  categories: [],
  salary: { min: 1000, max: 3000, unit: "usd", negotiable: false },
  description: "",
  skillTags: [],
  preferedLangs: [],
  locations: [],
  photoFile: undefined,
  postPhoto: "",
};
const JobPostForm = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const onFinish = async (post: Post) => {
    setLoading(true);
    const { error, url } = await uploadImage(post.photoFile[0]);
    if (error) {
      message.error(error);
      setLoading(false);
      return;
    }
    post.postPhoto = url;
    try {
      Utils.renameProperty(post, "categories", "jobCategories");
      const { data } = await postApi.createPost(post);
      message.info("Create job hirement post successfully!");
    } catch (error: any) {
      await deteteImage(url);
      message.error(error.message);
    }
    setLoading(false);
    form.resetFields();
  };

  const onFinishFailed = (errorInfo: any) => {};

  return (
    <Form
      {...layout}
      form={form}
      layout="horizontal"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      initialValues={defaultFormValue}>
      <Row gutter={[80, 0]}>
        <Col xs={24} md={12}>
          <Form.Item name="title" rules={[{ required: true, message: "Please input job title!" }]}>
            <LabelInput label="Job title" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            name="jobType"
            labelCol={{ span: 24 }}
            rules={[{ required: true, message: "Please enter job type!" }]}>
            <JobTypeSelect />
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item
            name="categories"
            rules={[{ required: true, message: "Please input job category!" }]}>
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
            <SkillSearchSelect />
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
          <Form.Item
            name="locations"
            rules={[{ required: true, message: "Please choose working location of company" }]}>
            <WorkLocationSelect />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            name="photoFile"
            rules={[{ required: true, message: "Please choose photo of post!" }]}>
            <ImageFileUpload />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <div className="flex justify-between">
          <Button size="large" className="mr-5 border !rounded">
            Preview mode
          </Button>
          <div>
            <Button
              type="text"
              size="large"
              className="mr-5 border !rounded"
              onClick={() => setLoading(false)}>
              Save draft
            </Button>
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              className="!rounded"
              loading={loading}>
              Publish
            </Button>
          </div>
        </div>
      </Form.Item>
    </Form>
  );
};

export default JobPostForm;
