import { useMemo } from "react";
import { useLocation, Link } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import { FaSuitcase, FaMoneyBill, FaRegUser } from "react-icons/fa";
import { GiTalk } from "react-icons/gi";
import { Menu } from "antd";

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
    icon: <MdOutlineDashboard />,
    label: "Dashboard",
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
    icon: <FaRegUser />,
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
    icon: <FaRegUser />,
    label: "My Profile",
    href: "/profile",
  },
];

const NavLinks = ({ onMenuItemClick }: NavLinkProps) => {
  const location = useLocation();
  const selectedKey = useMemo(() => {
    const { pathname } = location;
    let foundKey = "";
    items.forEach((item) => {
      if (item.href === pathname) {
        foundKey = item.key ?? "";
      } else if (item.subItems) {
        const subItem = item.subItems.find((sub) => sub.href === pathname);
        if (subItem) {
          foundKey = subItem.key ?? "";
        }
      }
    });
    return foundKey;
  }, [location, useLocation]);
  return (
    <Menu
      theme="light"
      mode="inline"
      selectedKeys={[selectedKey]}
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
              <Menu.Item key={subItem.key} icon={subItem.icon}>
                <Link to={subItem.href ?? "/"} title={subItem.label}>
                  {subItem.label}
                </Link>
              </Menu.Item>
            ))}
          </Menu.SubMenu>
        ) : (
          <Menu.Item key={item.key} icon={item.icon}>
            <Link to={item.href ?? "/"} title={item.label}>
              {item.label}
            </Link>
          </Menu.Item>
        )
      )}
    </Menu>
  );
};

export default NavLinks;
