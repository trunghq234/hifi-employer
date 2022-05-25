import authApi from "@/api/authApi";
import emailApi from "@/api/emailApi";
import { FromLocation } from "@/components/Login/LoginForm";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { authActions } from "@/store/reducers/authSlice";
import { selectUser } from "@/store/selectors";
import { WorkLocation } from "@/types";
import { unwrapResult } from "@reduxjs/toolkit";
import { message, Steps } from "antd";
import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import AccountInfoForm from "./AccountInfoForm";
import CompanyInfoForm from "./CompanyInfoForm";
import VerificationForm from "./VerificationAccount";

const { Step } = Steps;

const companySizeOptions: string[] = [
  "Less than 10",
  "10-50",
  "50-100",
  "100-500",
  "500-1000",
  "1000+",
];
type RegisterFormValue = {
  email: string;
  password: string;
  isVerified: boolean;
  confirmPassword: string;
  name: string;
  size: string;
  industries: [];
  contactName: string;
  phoneNumber: string;
  location: Partial<WorkLocation>;
  summary: string;
};

const RegisterForm = () => {
  const dispatch = useAppDispatch();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<RegisterFormValue>();
  const [isSubmit, setIsSubmit] = useState(false);
  const user = useAppSelector(selectUser);
  const location = useLocation();
  const from = (location.state as FromLocation)?.from?.pathname || "/";

  const updateFormData = async (data: any) => {
    setFormData((prev) => ({ ...prev, ...data }));
    if (data.lastStep) {
      setIsSubmit(true);
    }
  };

  useEffect(() => {
    let isMounted = true;
    if (isSubmit) {
      dispatch(authActions.register(formData))
        .then(unwrapResult)
        .then((data) => {
          message.success("Register successfully");
        })
        .catch((err: any) => {
          message.error(err.message);
        })
        .finally(() => {
          isMounted && setIsSubmit(false);
        });
    }
    return () => {
      isMounted = false;
    };
  }, [isSubmit]);

  if (user) {
    return <Navigate to={from} replace />;
  }
  return (
    <div className="bg-white-color min-h-screen">
      <div className="h-screen overflow-y-scroll">
        <div className="px-6 lg:px-20 xl:px-36 py-10 min-h-screen">
          <div className="my-1">
            <h3 className="text-3xl font-bold">Sign Up for Employers</h3>
            <p className="text-base font-normal mb-1 my-2">
              Create employer account to get access to our resume database and post your job right
              now
            </p>
          </div>

          <div className="my-6 px-14">
            <Steps current={step}>
              <Step title="Account" />
              <Step title="Verify account" />
              <Step title="Company Info" />
            </Steps>
          </div>
          <div className="mt-2 w-full flex items-center">
            <div>
              {step === 0 && (
                <AccountInfoForm
                  onNext={(data) => {
                    updateFormData(data);
                    setStep((prev) => prev + 1);
                  }}
                />
              )}
              {step === 1 && (
                <VerificationForm
                  email={formData?.email}
                  onPrevious={() => {
                    setStep((prev) => prev - 1);
                  }}
                  onNext={async (data) => {
                    updateFormData({ isVerified: true });
                    setStep((prev) => prev + 1);
                  }}
                />
              )}
              {step === 2 && (
                <CompanyInfoForm
                  onPrevious={() => {
                    setStep((prev) => prev - 1);
                  }}
                  loading={isSubmit}
                  onNext={async (data) => {
                    updateFormData(data);
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
