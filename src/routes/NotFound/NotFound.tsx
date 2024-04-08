import { Empty, Button, Space } from "antd";
import { useNavigate } from "react-router-dom";
import NotFound from "../../assets/not-found.svg";

const App = () => {
  const navigate = useNavigate();
  return (
    <Empty
      image={<img src={NotFound} alt="Not found" />}
      imageStyle={{ height: 280 }}
      description={<span></span>}
    >
      <Space>
        <Button type="default" size="large" onClick={() => navigate(-1)}>
          Go Back
        </Button>
        <Button
          type="primary"
          size="large"
          onClick={() => navigate("/", { replace: true })}
        >
          Back to Home
        </Button>
      </Space>
    </Empty>
  );
};

export default App;
