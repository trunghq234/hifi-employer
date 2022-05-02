import { Application } from "@/types";
import { Avatar, Button, Card } from "antd";
import ExternalLink from "../ExternalLink";

interface IProps {
  candidate: Application;
}

const CandidateCard = ({ candidate }: IProps) => {
  const renderFooterButton = (status: string) => {
    switch (status) {
      case "NEW":
        return (
          <>
            <Button>Unsuitable</Button>
            <Button type="primary">Approve</Button>
          </>
        );
      case "IN_PROGRESS":
        return <Button type="primary">Message</Button>;
      case "UNSUITABLE":
        return <Button type="primary">Approve back</Button>;
      case "HIRED":
        break;
    }
  };
  return (
    <Card>
      <div className="flex gap-5">
        <Avatar src={candidate.user.photoUrl} size={64} />
        <h3>{candidate.user.name}</h3>
      </div>
      <div>
        <p>abc</p>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-10">
          <ExternalLink candidate={candidate} title="Cover letter" />
          <ExternalLink candidate={candidate} title="Resume" />
        </div>
        <div className="flex gap-4">{renderFooterButton(candidate.status)}</div>
      </div>
    </Card>
  );
};

export default CandidateCard;
