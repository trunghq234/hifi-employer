import postApi from "@/api/postApi";
import { DataSource } from "@/pages/JobPost";
import { Post } from "@/types";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, notification, Popconfirm, Table, Tag, Tooltip } from "antd";
import { ColumnsType } from "antd/lib/table";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./index.module.less";

type Props = {
  data?: DataSource;
  query: string;
};

type PostTable = {
  title: string;
  company: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  _id: string;
};
const convertToTableData = (posts: Post[]) => {
  const tmp = posts.map((e: Post) => {
    return {
      title: e.title,
      company: e.company?.name ?? "",
      createdAt: moment(e.createdAt).format("DD/MM/YYYY HH:mm:ss"),
      updatedAt: moment(e.updatedAt).format("DD/MM/YYYY HH:mm:ss"),
      //@ts-ignore
      category: e.jobCategory?.category?.name ?? "",
      _id: e._id,
      status:
        e.verficationStatus == "fulfilled"
          ? "Approved"
          : e.verficationStatus.charAt(0).toUpperCase() + e.verficationStatus.slice(1),
    };
  });
  return tmp;
};

const ListPost = (props: Props) => {
  const [confirmVisibleItem, setConfirmVisibleItem] = useState("");
  const columns: ColumnsType<PostTable> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "30%",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: "15%",
      align: "center",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
      width: "15%",
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      align: "center",
      width: "15%",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      width: "10%",
      render: (tag) => {
        const color = tag == "Pending" ? "orange" : tag == "Approved" ? "blue" : "gray";
        return (
          <Tag color={color} key={tag}>
            {tag}
          </Tag>
        );
      },
    },
    {
      key: "_id",
      dataIndex: "_id",
      align: "center",
      render: (_id: any) => {
        return (
          <div>
            <Tooltip title="View details">
              <Link to={`/job-posts/${_id}`}>
                <Button icon={<EyeOutlined />} className={styles.action} />
              </Link>
            </Tooltip>
            <Tooltip title="Edit">
              <Button
                onClick={() => navigate(_id + "/update")}
                icon={<EditOutlined />}
                className={styles.action}
              />
            </Tooltip>
            <Tooltip title="Delete">
              <Popconfirm
                title="Are you sure delete this task?"
                visible={confirmVisibleItem === _id}
                onConfirm={() => {
                  handleDeletePost(_id);
                  setConfirmVisibleItem("");
                }}
                onCancel={() => setConfirmVisibleItem("")}
                okText="Yes"
                cancelText="No">
                <Button
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => setConfirmVisibleItem(_id)}
                  className={styles.action}
                />
              </Popconfirm>
            </Tooltip>
          </div>
        );
      },
    },
  ];
  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState<PostTable[]>([]);
  const [totalSize, setTotalSize] = useState(10);

  const handleDeletePost = async (id: any) => {
    try {
      const result = await postApi.deletePost(id);
      setDataSource(dataSource.filter((element) => element._id !== id));
      notification.success({ message: "Successfully!" });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangePage = async (currPage: number) => {
    try {
      let tmp = props.query;
      tmp += props.query.length > 0 ? `&page=${currPage}` : `?page=${currPage}`;
      const res = await postApi.getPosts(tmp);
      if (res.data.data) {
        const tmp = convertToTableData(res.data.data);
        setDataSource(tmp);
        setTotalSize(res.data.totalItems);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (props.data) {
      setTotalSize(props.data.totalItems);

      const tmp = convertToTableData(props.data.data);
      console.log("prop.data", props.data);
      setDataSource(tmp);
    }
  }, [props.data]);

  return (
    <div>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{
          total: totalSize,
          onChange: (page: number) => handleChangePage(page),
        }}
      />
    </div>
  );
};

export default ListPost;
