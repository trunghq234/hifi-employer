import { applicationStatus } from "@/constants";
import { updateApplication } from "@/store/actions/applicationActions";
import { useAppDispatch } from "@/store/hooks";
import { Application } from "@/types";
import { stringHelper } from "@/utils";
import { Avatar, Button, Col, Row, Tag } from "antd";
import DescriptionText from "../DescriptionText";
import ExternalLink from "../ExternalLink";
import TitleApplication from "../TitleApplication";
import * as SimpleIcons from "react-icons/si";

const CandidateCard = ({ candidate }: { candidate: Application }) => {
  const dispatch = useAppDispatch();

  const updateStatus = (idApplication: string, status: string) => {
    dispatch(updateApplication({ idApplication, status }));
  };

  const renderFooterButton = (status: string) => {
    switch (status) {
      case "NEW":
        return (
          <>
            <Button onClick={() => updateStatus(candidate._id, applicationStatus.unsuitable)}>
              Unsuitable
            </Button>
            <Button
              type="primary"
              onClick={() => updateStatus(candidate._id, applicationStatus.inProgress)}>
              Approve
            </Button>
          </>
        );
      case "IN_PROGRESS":
        return (
          <>
            <Button type="default">Message</Button>
            <Button
              type="primary"
              onClick={() => updateStatus(candidate._id, applicationStatus.hired)}>
              Hire
            </Button>
          </>
        );
      case "UNSUITABLE":
        return (
          <Button
            type="primary"
            onClick={() => updateStatus(candidate._id, applicationStatus.inProgress)}>
            Approve back
          </Button>
        );
      case "HIRED":
        break;
    }
  };

  return (
    <div className="mb-4 p-4 flex flex-col gap-4 border border-slate-300 rounded-lg	border-solid">
      <div className="flex gap-5">
        <Avatar
          src={
            candidate.user.photoUrl ||
            `https://ui-avatars.com/api/?background=random&color=random&font-size=0.33&name=${candidate.user.name}`
          }
          size={64}
        />
        <div>
          <h3 className="m-0">{candidate.user.name}</h3>
          <p className="m-0">{candidate.user.address}</p>
        </div>
      </div>
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <TitleApplication title="CONTACT" />
          <DescriptionText
            title={"Email:"}
            description={
              <a href={`mailto:${candidate.user.email}`} target="_blank">
                {candidate.user.email}
              </a>
            }
          />
          <DescriptionText
            title={"Phone number:"}
            description={<span>{candidate.user.phoneNumber}</span>}
          />
        </Col>
        <Col>
          <TitleApplication title="ABOUT" />
          <DescriptionText title={""} description={<span>candidate.user.about</span>} />
        </Col>
      </Row>
      <div className="flex justify-between">
        <div className="flex gap-10">
          <ExternalLink candidate={candidate} title="Cover letter" />
          <ExternalLink candidate={candidate} title="Resume" />
        </div>
        <div className="flex gap-4">{renderFooterButton(candidate.status)}</div>
      </div>
    </div>
  );
};

export default CandidateCard;
