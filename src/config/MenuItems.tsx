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
      path: "/",
      name: "Dashboard",
      icon: (
        <span role="img" className="anticon">
          <HiViewGrid size={20} />
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
      path: "/manage-candidates",
      name: "Candidates",
      icon: (
        <span role="img" className="anticon">
          <HiOutlineBriefcase size={20} />
        </span>
      ),
    },
    {
      path: "/job-post",
      name: "Post Job",
      icon: (
        <span role="img" className="anticon">
          <HiOutlinePencilAlt size={20} />
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
