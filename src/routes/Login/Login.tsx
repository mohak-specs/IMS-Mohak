import { Form, Input, Button, Card, Typography, message } from "antd";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useAuth } from "../../providers/AuthProvider";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Loader from "../../components/Loader";
import CopyRight from "../../components/Copyright";
import "./Login.css";

const { Title, Text } = Typography;
type FormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const { token, setToken } = useAuth();
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
      navigate(`${location.state?.callbackPath || "/"}`, { replace: true });
      message.success(`Welcome! ${res.data.user.name}`, 2);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        message.error(err.response?.data.message || err.message);
      } else {
        message.error("Something went wrong");
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
          autoComplete="off"
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
            <Input type="email" className="input" placeholder="Email Address" />
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
