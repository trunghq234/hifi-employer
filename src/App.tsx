import MainLayout from "@/components/Layout";
import { ConfigProvider } from "antd";
import enUS from "antd/lib/locale/en_US";
import { BrowserRouter } from "react-router-dom";

export default function App() {
  return (
    <ConfigProvider locale={enUS}>
      <BrowserRouter>
        <MainLayout />
      </BrowserRouter>
    </ConfigProvider>
  );
}
