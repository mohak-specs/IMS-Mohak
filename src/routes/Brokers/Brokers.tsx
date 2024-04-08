import { useQuery } from "@tanstack/react-query";
import { getBrokers } from "../../api/Broker";
import { useEffect } from "react";
import useLoadingStore from "../../store/useLoadingStore";
import PageTitle from "../../components/PageTitle";
import { Button, Col, Form, Input, Row, Select, Space, Typography } from "antd";
import { IoSearchOutline } from "react-icons/io5";
const Brokers = () => {
  const { setIsLoading } = useLoadingStore();
  const [form] = Form.useForm();
  const { data: brokers, isLoading } = useQuery({
    queryKey: ["brokers"],
    queryFn: getBrokers,
  });
  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading]);
  return (
    <>
      <PageTitle title="Brokers" />
      <Form
        form={form}
        name="filterBrokers"
        initialValues={{
          name: "",
          locationType: "",
          sectors: [],
          regions: [],
          isActive: true,
        }}
        onFinish={(values) => console.log(values)}
      >
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col xs={24} sm={12} md={8} lg={6} xl={4} xxl={3}>
            <Form.Item name="name">
              <Input
                placeholder="Search Broker Name"
                prefix={<IoSearchOutline />}
                variant="filled"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={4} xxl={3}>
            <Form.Item name="locationType">
              <Select
                placeholder="Location Type"
                allowClear
                options={[
                  { value: "Domestic", label: "Domestic" },
                  { value: "Foreign", label: "Foreign" },
                ]}
                variant="filled"
                suffixIcon={<IoSearchOutline />}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={4} xxl={3}>
            <Form.Item name="sectors">
              <Select
                placeholder="Sectors"
                allowClear
                showSearch
                mode="multiple"
                options={[
                  { value: "Domestic", label: "Domestic" },
                  { value: "Foreign", label: "Foreign" },
                ]}
                variant="filled"
                suffixIcon={<IoSearchOutline />}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={4} xxl={3}>
            <Form.Item name="regions">
              <Select
                placeholder="Regions"
                allowClear
                showSearch
                mode="multiple"
                options={[
                  { value: "Domestic", label: "Domestic" },
                  { value: "Foreign", label: "Foreign" },
                ]}
                variant="filled"
                suffixIcon={<IoSearchOutline />}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={4} xxl={3}>
            <Form.Item name="isActive">
              <Select
                placeholder="Is Active"
                allowClear
                options={[
                  { value: true, label: "Active" },
                  { value: false, label: "Inactive" },
                ]}
                variant="filled"
                suffixIcon={<IoSearchOutline />}
                defaultValue={true}
              />
            </Form.Item>
          </Col>
          <Col>
            <Space>
              <Button type="primary" htmlType="submit">
                Search
              </Button>
              <Typography.Text type="warning">
                {brokers?.data?.length} Results
              </Typography.Text>
            </Space>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Brokers;
