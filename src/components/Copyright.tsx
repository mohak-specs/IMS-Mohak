import { Typography } from "antd";

const CopyRight = ({ fontSize }: { fontSize: number }) => (
  <Typography.Text type="secondary" style={{ fontSize: fontSize }}>
    {`Copyright © Radico Khaitan Ltd. ${new Date().getFullYear()}`}
  </Typography.Text>
);

export default CopyRight;
