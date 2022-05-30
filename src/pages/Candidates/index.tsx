import postApi from "@/api/postApi";
import CandidatesList from "@/components/Applications/CandidatesList";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { applicationActions } from "@/store/reducers/applicationSlice";
import { selectApplications, selectUser } from "@/store/selectors";
import { Application } from "@/types";
import { stringHelper } from "@/utils";
import { Card, Col, Input, Row, Select, Tabs } from "antd";
import { useEffect, useState } from "react";

const { Option } = Select;
const { Search } = Input;
const { TabPane } = Tabs;

type Title = {
  _id: string;
  title: string;
};

type CandidatesList = {
  new: Application[];
  inProgress: Application[];
  hired: Application[];
  unsuitable: Application[];
};

const Candidates = () => {
  const [titleOptions, setTitleOptions] = useState<JSX.Element[]>();
  const [candidates, setCandidates] = useState<CandidatesList>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const user = useAppSelector(selectUser);
  const applications = useAppSelector(selectApplications);
  const dispatch = useAppDispatch();

  const renderOptions = (titles: Array<Title>) => {
    return titles.map((e) => <Option key={e._id}>{e.title}</Option>);
  };

  const clasifyStatus = (candidates: Application[]) => {
    if (!candidates) {
      return;
    }
    const candidatesList: CandidatesList = {
      new: [],
      inProgress: [],
      hired: [],
      unsuitable: [],
    };
    candidates.map((candidate) => {
      switch (candidate.status) {
        case "NEW":
          candidatesList.new.push(candidate);
          break;
        case "IN_PROGRESS":
          candidatesList.inProgress.push(candidate);
          break;
        case "UNSUITABLE":
          candidatesList.unsuitable.push(candidate);
          break;
        case "HIRED":
          candidatesList.hired.push(candidate);
          break;
      }
    });
    setCandidates(candidatesList);
  };

  const handleSelectPosition = (id: any) => {
    setIsLoading(true);
    dispatch(applicationActions.getApplications(id));
  };

  const handleSearch = (searchText: any) => {
    const dataSearch = applications?.filter(
      (application) =>
        stringHelper
          .removeAccents(application.user.name.toLowerCase())
          .search(searchText.toLowerCase()) >= 0,
    );
    if (!dataSearch) return;
    clasifyStatus(dataSearch);
  };

  useEffect(() => {
    setIsLoading(false);
    if (applications) {
      clasifyStatus(applications);
    }
  }, [applications]);

  useEffect(() => {
    postApi
      .getAllPostByCompany(user?._id)
      .then((res) => {
        const titles = res.data.data;
        const titleOptions = renderOptions(titles);
        setTitleOptions(titleOptions);
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
            <Search
              size="large"
              placeholder="Search candidates"
              enterButton
              onSearch={(e) => handleSearch(e)}
            />
          </Col>
        </Row>
      </Card>
      <Card className="my-3" loading={isLoading}>
        <Tabs defaultActiveKey="1" type="card">
          <TabPane tab="New" key="1">
            <CandidatesList candidates={candidates?.new} />
          </TabPane>
          <TabPane tab="In progress" key="2">
            <CandidatesList candidates={candidates?.inProgress} />
          </TabPane>
          <TabPane tab="Hired" key="6">
            <CandidatesList candidates={candidates?.hired} />
          </TabPane>
          <TabPane tab="Unsuitable" key="7">
            <CandidatesList candidates={candidates?.unsuitable} />
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default Candidates;
