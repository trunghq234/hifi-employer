import { UnorderedListOutlined } from "@ant-design/icons";
import { HiBriefcase, HiChat, HiCog, HiHome } from "react-icons/hi";

const MenuItems = {
  routes: [
    {
      path: "/",
      name: "Welcome",
      icon: (
        <span role="img" className="anticon">
          <HiHome size={20} />
        </span>
      ),
    },
    {
      path: "/manage-candidates",
      name: "Candidates",
      icon: (
        <span role="img" className="anticon">
          <HiBriefcase size={20} />
        </span>
      ),
    },
    {
      path: "/job-posts",
      name: "Job Posts",
      icon: (
        <span role="img" className="anticon">
          <UnorderedListOutlined size={20} />
        </span>
      ),
    },
    {
      path: "/chatting",
      name: "Chatting",
      icon: (
        <span role="img" className="anticon">
          <HiChat size={20} />
        </span>
      ),
    },
    {
      path: "/setting",
      name: "Setting",
      icon: (
        <span role="img" className="anticon">
          <HiCog size={20} />
        </span>
      ),
    },
  ],
};

export default MenuItems;
