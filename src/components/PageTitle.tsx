import { Typography, Divider } from "antd";

const PageTitle = ({ title }: { title: String }) => {
  return (
    <>
      <Typography.Title level={3}>{title}</Typography.Title>
      <Divider style={{ margin: 0, marginBottom: "8px" }} />
    </>
  );
};

export default PageTitle;
