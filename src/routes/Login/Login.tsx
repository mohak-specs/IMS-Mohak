import { Form, Input, Button, Card, Typography, message } from "antd";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useAuth } from "../../providers/AuthProvider";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Loader from "../../components/Loader";
import CopyRight from "../../components/Copyright";
import useUserStore from "../../store/useUserStore";
import "./Login.css";

const { Title, Text } = Typography;
type FormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const { token, setToken } = useAuth();
  const { setUser } = useUserStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [form] = Form.useForm();

  const handleSubmit = async (values: FormValues) => {
    try {
      setIsLoading(true);
      const res = await axios.post("auth/login", values);
      form.resetFields();
      setToken(res.data.accessToken);
      setUser(res.data.user);
      navigate(`${location.state?.callbackPath || "/"}`, { replace: true });
      messageApi.success(`Welcome! ${res.data.user.name}`, 2);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        messageApi.error(err.response?.data.message || err.message);
      } else {
        messageApi.error("Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/", { replace: true });
    }
  }, [token, navigate]);

  return (
    <div className="container">
      {contextHolder}
      <Loader isLoading={isLoading} />
      <Card className="card">
        <Title level={3}>Login</Title>
        <Text type="secondary">Login with your credentials</Text>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="form"
          initialValues={{ email: "", password: "" }}
        >
          <Form.Item
            label="Email Address"
            name="email"
            rules={[
              { required: true, message: "Email is required" },
              { type: "email", message: "Invalid email address" },
            ]}
            className="form-item"
          >
            <Input
              type="email"
              className="input"
              placeholder="Email Address"
              autoComplete="username"
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Password is required" }]}
            className="form-item"
          >
            <Input.Password
              iconRender={(visible) =>
                visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
              }
              className="input"
              placeholder="Password"
              autoComplete="current-password"
            />
          </Form.Item>
          <Form.Item className="form-item">
            <Button
              type="primary"
              htmlType="submit"
              className="login-btn"
              loading={isLoading}
              style={{ width: "100%", backgroundColor: "#3CAB4B" }}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
        <CopyRight fontSize={12} />
      </Card>
    </div>
  );
};

export default Login;
