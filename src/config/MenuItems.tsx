import { HiOutlineBriefcase, HiViewGrid } from "react-icons/hi";

const MenuItems = {
  routes: [
    {
      path: "/",
      name: "Dashboard",
      icon: (
        <span role="img" className="anticon">
          <HiViewGrid />
        </span>
      ),
    },
    {
      path: "/sample",
      name: "Sample",
    },
    {
      path: "/chatting",
      name: "Chatting",
    },
    {
      path: "/manage-candidates",
      name: "Candidates",
      icon: (
        <span role="img" className="anticon">
          <HiOutlineBriefcase />
        </span>
      ),
    },
    {
      path: "/job-posts",
      name: "Job Posts",
      icon: (
        <span role="img" className="anticon">
          <HiOutlineBriefcase />
        </span>
      ),
    },
  ],
};

export default MenuItems;
