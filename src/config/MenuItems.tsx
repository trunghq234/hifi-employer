import { HiBriefcase, HiChat, HiCog, HiPencil } from "react-icons/hi";
import { UnorderedListOutlined } from "@ant-design/icons";
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
