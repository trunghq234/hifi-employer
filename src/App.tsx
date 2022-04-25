import MainLayout from "@/components/Layout";
import { AppVariables } from "@/config";
import { store } from "@/store";
import { unwrapResult } from "@reduxjs/toolkit";
import { ConfigProvider } from "antd";
import enUS from "antd/lib/locale/en_US";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import authApi from "./api/authApi";
import AdminRoutes from "./config/AdminRoutes";
import RequireAuth from "./pages/Auth";
import LoadingPage from "./pages/LoadingPage";
import Loginpage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MainRoutes from "./pages/Routes";
import { useAppDispatch } from "./store/hooks";
import { authActions } from "./store/reducers/authSlice";
export default function App() {
  return (
    <ConfigProvider locale={enUS}>
      <BrowserRouter>
        <Provider store={store}>
          <MainRoutes />
        </Provider>
      </BrowserRouter>
    </ConfigProvider>
  );
}
