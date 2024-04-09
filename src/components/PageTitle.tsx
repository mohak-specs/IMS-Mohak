import { Typography, Divider, Space, Tooltip, Button } from "antd";
import { IoArrowBackSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const PageTitle = ({
  title,
  isOnBack = true,
}: {
  title: String;
  isOnBack?: boolean;
}) => {
  const navigate = useNavigate();
  return (
    <>
      <Space align="start">
        {isOnBack && (
          <Tooltip title="Back">
            <Button
              shape="circle"
              size="large"
              icon={<IoArrowBackSharp />}
              onClick={() => navigate(-1)}
            />
          </Tooltip>
        )}
        <Typography.Title level={3}>{title}</Typography.Title>
      </Space>
      <Divider style={{ margin: 0, marginBottom: "8px" }} />
    </>
  );
};

export default PageTitle;
