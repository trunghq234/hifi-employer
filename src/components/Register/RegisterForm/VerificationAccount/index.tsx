import emailApi from "@/api/emailApi";
import { Button, Input, InputRef, message } from "antd";
import axios from "axios";
import React, { useRef, useState } from "react";

type Props = {
  email?: string;
  onPrevious?: (currenData: any) => void;
  onNext?: (data?: any) => void;
};

const VerificationForm = ({ onNext, onPrevious, email }: Props) => {
  const [isVerified, setIsVerified] = useState(false);
  const inputRef = useRef<InputRef | null>(null);

  const handleVerifyClick = async () => {
    const code = inputRef.current?.input?.value;
    if (!code) {
      message.error("Please enter verification code");
      return;
    }
    try {
      await emailApi.verifyCode({ email, code });
      setIsVerified(true);
      onNext?.();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        message.error(error.response?.data.message);
      } else {
        message.error("Error verifying code");
      }
    }
  };

  return (
    <div>
      Verification email has been sent to {email}! Please check your inbox or junk mail. Didn't
      receive the email?
      <div className="flex gap-4">
        <Input ref={inputRef} className="my-2 w-1/3" />
        <Button className="my-2 bg-primary-color" onClick={handleVerifyClick}>
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
