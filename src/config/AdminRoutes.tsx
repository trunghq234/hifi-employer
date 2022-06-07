import { PostDetails } from "@/components/JobPost/PostDetails";
import AboutPage from "@/pages/AboutPage";
import Candidates from "@/pages/Candidates";
import Chatting from "@/pages/Chatting";
import Dashboard from "@/pages/Dashboard";
import JobPostsPage from "@/pages/JobPost";
import NewPostPage from "@/pages/JobPost/NewPost";
import UpdatePostPage from "@/pages/JobPost/UpdatePost";
import Loginpage from "@/pages/LoginPage";
import NotFoundPage from "@/pages/NotFound";
import SignUpPage from "@/pages/RegisterPage";
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
    path: "/404",
    page: <NotFoundPage />,
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
    path: "/job-posts",
    page: <JobPostsPage />,
  },
  {
    path: "/job-posts/new",
    page: <NewPostPage />,
  },
  {
    path: "/job-posts/:id/update",
    page: <UpdatePostPage />,
  },
  {
    path: "/job-posts/:id",
    page: <PostDetails />,
  },
  {
    path: "/setting",
    page: <Setting />,
  },
];

export default AdminRoutes;
