import { useAppSelector } from "@/store/hooks";
import { selectUser } from "@/store/selectors";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

type Props = {};

const RequireAuth: React.FC = ({ children }) => {
  let user = useAppSelector(selectUser);
  let location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default RequireAuth;
