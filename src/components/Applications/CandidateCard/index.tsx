import { applicationStatus } from "@/constants";
import { updateApplication } from "@/store/actions/applicationActions";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectUser } from "@/store/selectors";
import { Application } from "@/types";
import socket from "@/utils/messageSocket";
import notificationSocket from "@/utils/notificationSocket";
import { Avatar, Button, Col, Row } from "antd";
import moment from "moment";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DescriptionText from "../DescriptionText";
import ExternalLink from "../ExternalLink";
import TitleApplication from "../TitleApplication";
const CandidateCard = ({ candidate }: { candidate: Application }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);

  const updateStatus = (idApplication: string, status: string) => {
    dispatch(updateApplication({ idApplication, status }));

    const sendData = {
      receiverType: "employee",
      receiver: candidate.user._id,
      message: "Your application is " + status + " by " + user?.name,
      redirectUrl: "/user/applications?status=" + status,
      createdAt: moment(),
    };

    notificationSocket.emit("sendNotification", sendData);
  };

  const handleMessage = () => {
    socket.connect();
    socket.emit("joinRoomByChatterId", {
      user: candidate.user._id,
      company: user?._id,
    });

    navigate("/chatting");
  };

  useEffect(() => {
    if (candidate) {
      notificationSocket.emit("joinNotification", {
        receiver: candidate.user?._id,
      });
    }
  }, [candidate]);

  const renderFooterButton = (status: string) => {
    switch (status) {
      case "NEW":
        return (
          <>
            <Button
              style={{ width: 120 }}
              onClick={() => updateStatus(candidate._id, applicationStatus.unsuitable)}>
              Unsuitable
            </Button>
            <Button
              style={{ width: 120 }}
              type="primary"
              onClick={() => updateStatus(candidate._id, applicationStatus.inProgress)}>
              Approve
            </Button>
          </>
        );
      case "IN_PROGRESS":
        return (
          <>
            <Button
              style={{ width: 120 }}
              onClick={() => updateStatus(candidate._id, applicationStatus.unsuitable)}>
              Unsuitable
            </Button>
            <Button style={{ width: 120 }} type="primary" onClick={handleMessage}>
              Message
            </Button>
            <Button
              style={{ backgroundColor: "#1CB84B", borderColor: "#1CB84B", width: 120 }}
              type="primary"
              onClick={() => updateStatus(candidate._id, applicationStatus.hired)}>
              Hire
            </Button>
          </>
        );
      case "UNSUITABLE":
        return (
          <Button
            style={{ width: 120 }}
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
          <DescriptionText title={""} description={<span>{candidate.user.about}</span>} />
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
