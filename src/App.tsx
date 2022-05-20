import { store } from "@/store";
import { ConfigProvider } from "antd";
import enUS from "antd/lib/locale/en_US";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./App.less";
import MainRoutes from "./pages/Routes";

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
