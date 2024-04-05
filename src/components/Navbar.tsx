import { Layout, Avatar, MenuProps, Typography, Dropdown } from "antd";
import useUserStore from "../store/useUserStore";
import { useShallow } from "zustand/react/shallow";
import { useNavigate } from "react-router-dom";
import LogoutButton from "./LogoutButton";

const { Header } = Layout;

const Navbar = ({
  isMobile,
  colorBgContainer,
}: {
  isMobile: boolean;
  colorBgContainer: string;
}) => {
  const { user } = useUserStore(useShallow((state) => ({ user: state.user })));
  const navigate = useNavigate();
  const avatarMenuItems: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Typography.Title level={5}>Welcome! {user?.name}</Typography.Title>
      ),
    },
    {
      key: "2",
      label: <a onClick={() => navigate("/profile")}>My Profile</a>,
    },
    {
      key: "3",
      label: <LogoutButton />,
    },
  ];
  return (
    <Header
      style={{
        padding: 0,
        background: colorBgContainer,
        height: isMobile ? 48 : 64,
        position: "sticky",
        top: 0,
        zIndex: 1,
        width: "100%",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        paddingLeft: "12px",
        paddingRight: "12px",
        boxShadow: "0px 5px 5px -5px rgba(0, 0, 0, 0.75)",
      }}
    >
      <Dropdown menu={{ items: avatarMenuItems }} trigger={["click"]}>
        <Avatar
          style={{
            backgroundColor: "#fde3cf",
            color: "#f56a00",
            cursor: "pointer",
          }}
          size={36}
        >
          {user?.name[0]}
        </Avatar>
      </Dropdown>
    </Header>
  );
};

export default Navbar;
