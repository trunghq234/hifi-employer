import AboutPage from "@/pages/AboutPage";
import Dashboard from "@/pages/Dashboard";
import Loginpage from "@/pages/LoginPage";
import Sample from "@/pages/Sample";
import SignUpPage from "@/pages/RegisterPage";
import JobPost from "@/pages/JobPost";

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
    path: "/login",
    page: <Loginpage />,
  },
  {
    path: "/sign-up",
    page: <SignUpPage />,
  },
  {
    path: "/about",
    page: <AboutPage />,
  },
  {
    path: "/sample",
    page: <Sample />,
  },
  {
    path: "/job-post",
    page: <JobPost />,
  },
];

export default AdminRoutes;
