import { Application } from "@/types";
import { Button, Modal } from "antd";
import { useState } from "react";
import { HiOutlineExternalLink } from "react-icons/hi";

interface LinkProps {
  candidate: Application;
  title: string;
}

const ExternalLink = ({ candidate, title }: LinkProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  return (
    <div className="flex gap-1 items-center">
      <p className="m-0 text-base">{title}</p>
      {title == "Resume" ? (
        <a style={{ height: "18px" }} className="m-0" href={candidate.resume.url} target="_blank">
          <HiOutlineExternalLink size={18} />
        </a>
      ) : (
        <a style={{ height: "18px" }} onClick={() => setIsVisible(true)}>
          <HiOutlineExternalLink size={18} />
        </a>
      )}
      <Modal
        visible={isVisible}
        centered
        closable
        title="Cover letter"
        onCancel={() => setIsVisible(false)}
        footer={<Button onClick={() => setIsVisible(false)}>Close</Button>}>
        <p>{candidate.coverLetter}</p>
      </Modal>
    </div>
  );
};

export default ExternalLink;
