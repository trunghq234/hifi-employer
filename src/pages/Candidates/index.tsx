import { applicationApi } from "@/api";
import postApi from "@/api/postApi";
import CandidatesList from "@/components/Applications/CandidatesList";
import { Application } from "@/types";
import { Button, Card, Col, Input, Row, Select, Tabs } from "antd";
import { useEffect, useState } from "react";

const { Option } = Select;
const { Search } = Input;
const { TabPane } = Tabs;

type Title = {
  _id: string;
  title: string;
};

const Candidates = () => {
  const [titleOptions, setTitleOptions] = useState<JSX.Element[]>();
  const [newCandidates, setNewCandidates] = useState<Application[]>();
  const [inProgressCandidates, setInProgressCandidates] = useState<Application[]>();
  const [hiredCandidates, setHiredCandidates] = useState<Application[]>();
  const [unsuitableCandidates, setUnsuitableCandidates] = useState<Application[]>();

  const renderOptions = (titles: Array<Title>) => {
    return titles.map((e) => <Option key={e._id}>{e.title}</Option>);
  };

  const clasifyStatus = (candidates: Application[]) => {
    const newCandidates: Application[] = [];
    const inProgressCandidates: Application[] = [];
    const hiredCandidates: Application[] = [];
    const unsuitableCandidates: Application[] = [];
    candidates.map((candidate) => {
      switch (candidate.status) {
        case "NEW":
          newCandidates.push(candidate);
          break;
        case "IN_PROGRESS":
          inProgressCandidates.push(candidate);
          break;
        case "UNSUITABLE":
          unsuitableCandidates.push(candidate);
          break;
        case "HIRED":
          hiredCandidates.push(candidate);
          break;
      }
    });
    setNewCandidates(newCandidates);
    setInProgressCandidates(inProgressCandidates);
    setHiredCandidates(hiredCandidates);
    setUnsuitableCandidates(unsuitableCandidates);
  };

  const handleSelectPosition = (id: any) => {
    applicationApi
      .getAllPostByPost(id)
      .then((res) => {
        clasifyStatus(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    postApi
      .getAllPostByCompany("6236feaa5e6bdfc312fa5a49")
      .then((res) => {
        const titles = res.data.data;
        const tmp = renderOptions(titles);
        setTitleOptions(tmp);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1>Candidates management</h1>
      <Card>
        <Row gutter={[20, 20]} align="middle">
          <Col span={2}>
            <p className="text-lg font-semibold m-0">Position:</p>
          </Col>
          <Col span={12}>
            <Select
              placeholder="Select position"
              size="large"
              style={{ width: "100%" }}
              onChange={(e) => handleSelectPosition(e)}>
              {titleOptions}
            </Select>
          </Col>
          <Col flex="auto" />
          <Col span={8}>
            <Search size="large" placeholder="Search candidates" enterButton />
          </Col>
        </Row>
      </Card>
      <Card className="my-3">
        <Tabs defaultActiveKey="1" type="card">
          <TabPane tab="New" key="1">
            <CandidatesList candidates={newCandidates} />
          </TabPane>
          <TabPane tab="In progress" key="2">
            <CandidatesList candidates={inProgressCandidates} />
          </TabPane>
          <TabPane tab="Hired" key="6">
            <CandidatesList candidates={hiredCandidates} />
          </TabPane>
          <TabPane tab="Unsuitable" key="7">
            <CandidatesList candidates={unsuitableCandidates} />
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default Candidates;
