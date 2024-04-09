import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Layout, theme, Typography } from "antd";
import CopyRight from "./Copyright";
import SiderMenu from "./SiderMenu";
import { useMediaQuery } from "react-responsive";
import Navbar from "./Navbar";
const { Content, Footer, Sider } = Layout;

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  const {
    token: { colorBgContainer, borderRadiusLG, boxShadow },
  } = theme.useToken();
  const isMobile = useMediaQuery({ query: "(max-width: 992px)" });
  const [collapsed, setCollapsed] = useState<boolean>(false || isMobile);

  const toggleCollapsed = () => {
    setCollapsed((prev) => !prev);
  };

  const handleMenuItemClick = () => {
    if (isMobile) {
      setCollapsed(true);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        collapsed={collapsed}
        onCollapse={toggleCollapsed}
        style={{
          position: "fixed",
          zIndex: 10,
          height: "100%",
          boxShadow: collapsed ? "none" : "4px 0 4px rgba(0, 0, 0, 0.1)",
        }}
        theme="light"
      >
        <div className="logo" style={{ textAlign: "center", paddingTop: 10 }}>
          <Link to="/">
            <Typography.Title level={3} style={{ letterSpacing: "0.1em" }}>
              Radico ITSM
            </Typography.Title>
          </Link>
        </div>
        <SiderMenu onMenuItemClick={handleMenuItemClick} />
      </Sider>
      <Layout style={{ marginLeft: collapsed ? 0 : isMobile ? 0 : 200 }}>
        <Navbar isMobile={isMobile} colorBgContainer={colorBgContainer} />
        <Content style={{ margin: "24px 16px 0px" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              boxShadow,
              marginBottom: 12,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          <CopyRight fontSize={14} />
        </Footer>
      </Layout>
    </Layout>
  );
};

export default HomeLayout;
