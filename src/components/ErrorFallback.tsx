import { Button, Typography } from "antd";
const ErrorFallback = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography.Title level={2} style={{ fontWeight: 500, color: "red" }}>
        Oops, something went wrong {":("}{" "}
      </Typography.Title>
      <Button
        style={{ marginTop: "4px" }}
        onClick={() => window.location.assign(window.location.origin)}
      >
        Refresh
      </Button>
    </div>
  );
};

export default ErrorFallback;
