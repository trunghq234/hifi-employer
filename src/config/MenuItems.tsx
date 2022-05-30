import {
  HiCog,
  HiOutlineBriefcase,
  HiOutlineCog,
  HiOutlinePencilAlt,
  HiViewGrid,
} from "react-icons/hi";

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
          <HiOutlineBriefcase size={18} />
        </span>
      ),
    },
    {
      path: "/job-post",
      name: "Post Job",
      icon: (
        <span role="img" className="anticon">
          <HiOutlinePencilAlt size={18} />
        </span>
      ),
    },
    {
      path: "/setting",
      name: "Setting",
      icon: (
        <span role="img" className="anticon">
          <HiOutlineCog size={18} />
        </span>
      ),
    },
  ],
};

export default MenuItems;
