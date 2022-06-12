import { useAppDispatch } from "@/store/hooks";
import { authActions } from "@/store/reducers/authSlice";
import { EditOutlined, LogoutOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { HiLogout, HiOutlineLogout, HiPencil } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const Content = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(authActions.logout());
  };

  const editProfile = () => {
    navigate("/setting");
  };

  const contents = [
    {
      key: "1",
      icon: <HiPencil size={18} />,
      content: "Edit Profile",
      onClick: editProfile,
    },
    {
      key: "2",
      icon: <HiOutlineLogout size={18} />,
      content: "Log Out",
      onClick: handleLogout,
    },
  ];
  const renderMenu = () => {
    return contents.map((content) => {
      return (
        <Menu.Item
          style={{ padding: "0", fontSize: "16px", fontWeight: "400", alignItems: "center" }}
          key={content.key}
          onClick={content.onClick}
          icon={content.icon}>
          {content.content}
        </Menu.Item>
      );
    });
  };
  const menuRendered = renderMenu();
  return (
    <div>
      <Menu className="w-full">{menuRendered}</Menu>
    </div>
  );
};

export default Content;
