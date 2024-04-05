import { useLocation, Link } from "react-router-dom";
import { FaSuitcase, FaMoneyBill, FaUser, FaHome } from "react-icons/fa";
import { GiTalk } from "react-icons/gi";
import { RiProfileLine } from "react-icons/ri";
import { Button, Menu } from "antd";
import LogoutButton from "./LogoutButton";

type MenuItem = {
  groupName?: string;
  key?: string;
  icon?: JSX.Element;
  label?: string;
  href?: string;
  subItems?: MenuItem[];
};

type NavLinkProps = {
  onMenuItemClick: () => void;
};
const items: MenuItem[] = [
  {
    key: "1",
    icon: <FaHome />,
    label: "Home",
    href: "/",
  },
  {
    groupName: "Broker",
    icon: <FaMoneyBill />,
    subItems: [
      {
        key: "2",
        label: "Brokers",
        href: "/broker",
      },
      {
        key: "3",
        label: "New Broker",
        href: "/broker/create",
      },
    ],
  },
  {
    groupName: "Investor",
    icon: <FaSuitcase />,
    subItems: [
      {
        key: "4",
        label: "Investors",
        href: "/investor",
      },
      {
        key: "5",
        label: "New Investor",
        href: "/investor/create",
      },
    ],
  },
  {
    groupName: "Members",
    icon: <FaUser />,
    subItems: [
      {
        key: "6",
        label: "Members",
        href: "/member",
      },
      {
        key: "7",
        label: "New Member",
        href: "/member/create",
      },
      {
        key: "8",
        label: "Move Member",
        href: "/move-firm",
      },
    ],
  },
  {
    key: "9",
    icon: <GiTalk />,
    label: "New Interaction",
    href: "/interaction/create",
  },
  {
    key: "10",
    icon: <RiProfileLine />,
    label: "My Profile",
    href: "/profile",
  },
];

const SiderMenu = ({ onMenuItemClick }: NavLinkProps) => {
  const location = useLocation();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 64px)",
      }}
    >
      <Menu
        theme="light"
        mode="inline"
        selectedKeys={[location.pathname]}
        onClick={onMenuItemClick}
      >
        {items.map((item) =>
          item.groupName ? (
            <Menu.SubMenu
              key={item.groupName}
              title={item.groupName}
              icon={item.icon}
            >
              {item.subItems?.map((subItem) => (
                <Menu.Item key={subItem.href} icon={subItem.icon}>
                  <Link to={subItem.href ?? "/"} title={subItem.label}>
                    {subItem.label}
                  </Link>
                </Menu.Item>
              ))}
            </Menu.SubMenu>
          ) : (
            <Menu.Item key={item.href} icon={item.icon}>
              <Link to={item.href ?? "/"} title={item.label}>
                {item.label}
              </Link>
            </Menu.Item>
          )
        )}
      </Menu>
      <Button
        style={{
          marginTop: "auto",
          marginLeft: "8px",
          marginRight: "8px",
        }}
        type="primary"
        size="middle"
      >
        <LogoutButton />
      </Button>
    </div>
  );
};

export default SiderMenu;
