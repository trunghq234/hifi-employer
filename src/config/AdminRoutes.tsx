import AboutPage from "@/pages/AboutPage";
import Dashboard from "@/pages/Dashboard";
import Loginpage from "@/pages/LoginPage";
import Sample from "@/pages/Sample";
import SignUpPage from "@/pages/RegisterPage";
import Candidates from "@/pages/Candidates";
import NewPostPage from "@/pages/JobPost/NewPost";
import JobPostsPage from "@/pages/JobPost";
import { PostDetails } from "@/components/post/PostDetails";

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
    path: "/job-posts/:id",
    page: <PostDetails />,
  },
];

export default AdminRoutes;
