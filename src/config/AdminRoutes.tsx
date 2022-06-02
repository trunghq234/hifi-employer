import AboutPage from "@/pages/AboutPage";
import Dashboard from "@/pages/Dashboard";
import Loginpage from "@/pages/LoginPage";
import SignUpPage from "@/pages/RegisterPage";
import Chatting from "@/pages/Chatting";
import Candidates from "@/pages/Candidates";
import JobPost from "@/pages/JobPost";
import Setting from "@/pages/Setting";

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
    path: "/chatting",
    page: <Chatting />,
  },
  {
    path: "/manage-candidates",
    page: <Candidates />,
  },
  {
    path: "/job-post",
    page: <JobPost />,
  },
  {
    path: "/setting",
    page: <Setting />,
  },
];

export default AdminRoutes;
