import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Layout, theme, Typography } from "antd";
import CopyRight from "./Copyright";
import NavLinks from "./navLinks";
import { useMediaQuery } from "react-responsive";
const { Header, Content, Footer, Sider } = Layout;

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const isMobile = useMediaQuery({ query: "(max-width: 992px)" });
  const [collapsed, setCollapsed] = useState<boolean>(false);

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
          zIndex: 2,
          height: "100vh",
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
        <NavLinks onMenuItemClick={handleMenuItemClick} />
      </Sider>
      <Layout style={{ marginLeft: collapsed ? 0 : isMobile ? 0 : 200 }}>
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
            alignItems: "center",
          }}
        />
        <Content style={{ margin: "24px 16px 0px" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
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
