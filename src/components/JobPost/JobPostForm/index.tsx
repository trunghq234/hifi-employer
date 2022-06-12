import postApi from "@/api/postApi";
import { useAppSelector } from "@/store/hooks";
import { selectUser } from "@/store/selectors";
import { Post } from "@/types";
import { SaveTwoTone } from "@ant-design/icons";
import { Button, Col, DatePicker, Form, message, Row, Select } from "antd";
import moment from "moment";
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

const { Option } = Select;

type Props = {
  post?: Partial<Post>;
  changePreviewMode: (data: any) => void;
  onSuccess?: () => void;
};
const layout = {
  wrapperCol: { span: 24 },
};

const experienceLevelOptions = [
  "Internship",
  "Entry level",
  "Associate",
  "Mid-Senior level",
  "Director",
];
const workplaceTypeOptions = ["remote", "on-site", "hybrid"];
const defaultFormValue: Partial<Post> = {
  title: "",
  jobType: "",
  jobCategory: "",
  salary: { min: 1000, max: 3000, unit: "usd", negotiable: false },
  description: "",
  preferedLangs: [],
  locations: [],
  photoFile: undefined,
  postPhoto: "",
  applicationDeadline: moment(),
};
const JobPostForm = ({ post: postData, changePreviewMode, onSuccess }: Props) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const user = useAppSelector((state) => state.auth.user);

  const onFinish = async (post: Post) => {
    setLoading(true);
    try {
      await postApi.createPost(post);
      message.info("Create job hirement post successfully!");
      onSuccess?.();
    } catch (error: any) {
      message.error(error.message);
    }
    setLoading(false);
    form.resetFields();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      {...layout}
      form={form}
      layout="horizontal"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      initialValues={{
        ...defaultFormValue,
        ...postData,
      }}>
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
          <Label text="Experience Level" requiredMark />
          <Form.Item
            name="experienceLevel"
            rules={[{ required: true, message: "Please enter experience level!" }]}>
            <Select allowClear style={{ width: "100%" }} placeholder="Please select" size="large">
              {experienceLevelOptions.map((opt) => (
                <Option key={opt}>{opt}</Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Label text="Workplace type" requiredMark />
          <Form.Item
            name="workplaceType"
            rules={[{ required: true, message: "Please enter workplace type!" }]}>
            <Select
              allowClear
              style={{ width: "100%" }}
              placeholder="Please select"
              size="large"
              className="capitalize">
              {workplaceTypeOptions.map((opt) => (
                <Option key={opt}>{opt.capitalize()}</Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item
            name="jobCategory"
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
            <SkillSearchSelect defaultValues={postData?.skillTags ?? []} />
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
            <WorkLocationSelect options={user?.locations} />
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
            Publish
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default JobPostForm;
