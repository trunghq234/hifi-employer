import {
  HiOutlineBriefcase,
  HiOutlineChat,
  HiOutlineCog,
  HiOutlinePencilAlt,
  HiViewGrid,
} from "react-icons/hi";

const MenuItems = {
  routes: [
    {
      path: "/manage-candidates",
      name: "Candidates",
      icon: (
        <span role="img" className="anticon">
          <HiOutlineBriefcase size={20} />
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
    {
      path: "/chatting",
      name: "Chatting",
      icon: (
        <span role="img" className="anticon">
          <HiOutlineChat size={20} />
        </span>
      ),
    },
    {
      path: "/setting",
      name: "Setting",
      icon: (
        <span role="img" className="anticon">
          <HiOutlineCog size={20} />
        </span>
      ),
    },
  ],
};

export default MenuItems;
