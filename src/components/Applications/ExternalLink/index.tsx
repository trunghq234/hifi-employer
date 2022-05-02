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
        <a className="m-0" href={candidate.resume.fileUrl} target="_blank">
          <HiOutlineExternalLink size={18} />
        </a>
      ) : (
        <Button
          className="m-0"
          type="link"
          onClick={() => setIsVisible(true)}
          icon={<HiOutlineExternalLink size={18} />}
        />
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
