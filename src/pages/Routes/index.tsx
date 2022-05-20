import MainLayout from "@/components/Layout";
import { AdminRoutes } from "@/config";
import { useAppDispatch } from "@/store/hooks";
import { authActions } from "@/store/reducers/authSlice";
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import RequireAuth from "../Auth";
import LoadingPage from "../LoadingPage";
import Loginpage from "../LoginPage";
import RegisterPage from "../RegisterPage";

type Props = {};

const MainRoutes = (props: Props) => {
  const [firstLoad, setFirstLoad] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setFirstLoad(true);
      dispatch(authActions.verifyToken(accessToken))
        .unwrap()
        .then(() => {
          // handle result here
        })
        .catch((error) => {
          localStorage.removeItem("accessToken");
          // handle error here
        })
        .finally(() => {
          setFirstLoad(false);
        });
    }
  }, []);

  if (firstLoad) {
    return <LoadingPage />;
  }
  return (
    <Routes>
      <Route path="/login" element={<Loginpage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        element={
          <RequireAuth>
            <MainLayout />
          </RequireAuth>
        }>
        {AdminRoutes?.map((route) => (
          <Route key={route.path} path={route.path} element={route.page} />
        ))}
      </Route>
    </Routes>
  );
};

export default MainRoutes;
