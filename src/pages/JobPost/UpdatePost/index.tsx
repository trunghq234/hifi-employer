import { postApi } from "@/api";
import PostPreview from "@/components/JobPost/PostPreview";
import UpdatePostForm from "@/components/JobPost/UpdatePostForm";
import { Post, Skill } from "@/types";
import { LeftOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Card, Spin } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

type Props = {};

const UpdatePostPage = (props: Props) => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post>();
  const [mode, setMode] = useState("update");

  useEffect(() => {
    let isSubscribed = true;
    const fetchData = async () => {
      try {
        const res = await postApi.getById(id);
        if (res.data.data) {
          const postData = {
            ...res.data.data,
            skillTags: (res.data.data.skillTags as Array<Skill | string>).map(
              (skill: Skill | string) => (skill as Skill)?._id ?? (skill as string),
            ),
            jobCategory: res.data.data.jobCategory._id ?? (res.data.data.jobCategory as string),
          };
          isSubscribed && setPost(postData);
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

  console.log("post", post);
  return (
    <Card className="text-lg text-[#685879]">
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>
            <a href="/job-posts">Job Posts</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Update job post</Breadcrumb.Item>
        </Breadcrumb>
        <Link to={"/job-posts"}>
          <Button icon={<LeftOutlined />} className="my-3">
            Back
          </Button>
        </Link>
        <h2 className="font-bold text-xl text-center my-2">
          {mode === "update" ? "Update job post" : "Preview Post"}
        </h2>
      </div>
      {mode === "update" &&
        (post ? (
          <UpdatePostForm
            post={post}
            changePreviewMode={(data) => {
              setPost(data);
              setMode("preview");
            }}
          />
        ) : (
          <div className="flex justify-center items-center">
            <Spin />
          </div>
        ))}

      {mode === "preview" && post && (
        <PostPreview
          post={post}
          changeMode={() => {
            setMode("update");
          }}
        />
      )}
    </Card>
  );
};

export default UpdatePostPage;
