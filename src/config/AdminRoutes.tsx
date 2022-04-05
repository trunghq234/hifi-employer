import AboutPage from "@/pages/AboutPage";
import Dashboard from "@/pages/Dashboard";
import Sample from "@/pages/Sample";

interface IRoute {
  path: string;
  page: JSX.Element;
}

const AdminRoutes: IRoute[] = [
  {
    path: "/",
    page: <Dashboard />,
  },
  {
    path: "/about",
    page: <AboutPage />,
  },
  {
    path: "/sample",
    page: <Sample />,
  },
];

export default AdminRoutes;
