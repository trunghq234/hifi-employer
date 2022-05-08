import { Button, Input, message } from "antd";
import React, { useEffect, useState } from "react";

type Props = {
  email?: string;
  onPrevious?: (currenData: any) => void;
  onNext?: (data?: any) => void;
};

const VerificationForm = ({ onNext, onPrevious, email }: Props) => {
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    message.success("Send email success");
  }, [email]);

  return (
    <div>
      Verification email has been sent to {email}! Please check your inbox or junk mail. Didn't
      receive the email?
      <div className="flex gap-4">
        <Input className="my-2 w-1/3" />
        <Button className="my-2 bg-primary-color" onClick={() => setIsVerified(true)}>
          Verify
        </Button>
      </div>
      {isVerified && <p className="my-2">Verify successfully! You can go next</p>}
      {!isVerified && (
        <p className="my-2">
          You don't receiver verification email? <span className="text-blue-700">Resend</span>
        </p>
      )}
      <div className="flex justify-between w-full">
        <Button size="large" onClick={() => onPrevious?.(isVerified)}>
          Previous
        </Button>
        <Button size="large" htmlType="submit" onClick={() => onNext?.(true)} hidden={!isVerified}>
          Next Step
        </Button>
      </div>
    </div>
  );
};

export default VerificationForm;
