import logoImage from "@/assets/images/Logo.png";
import RightContent from "@/components/Layout/RightContent";
import { AdminRoutes, MenuItems } from "@/config";
import ProLayout from "@ant-design/pro-layout";
import { useState } from "react";
import { Link, NavLink, Route, Routes } from "react-router-dom";

const MainLayout = () => {
  const [pathname, setPathname] = useState(window.location.pathname);
  return (
    <ProLayout
      route={MenuItems}
      location={{
        pathname,
      }}
      title="Hifi business"
      logo={logoImage}
      fixedHeader
      fixSiderbar
      primaryColor="#6D5CE8"
      contentWidth="Fluid"
      layout="side"
      headerTitleRender={(logo, title) => (
        <Link to="/" onClick={() => setPathname("/")}>
          {logo}
          {title}
        </Link>
      )}
      menuItemRender={(item, dom) => (
        <NavLink
          to={`${item.path}`}
          onClick={() => {
            setPathname(item.path || "/");
          }}>
          {dom}
        </NavLink>
      )}
      rightContentRender={() => <RightContent />}>
      <Routes>
        {AdminRoutes?.map((route) => (
          <Route key={route.path} path={route.path} element={route.page} />
        ))}
      </Routes>
    </ProLayout>
  );
};

export default MainLayout;
