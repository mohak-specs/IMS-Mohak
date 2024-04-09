import { useQuery } from "@tanstack/react-query";
import { getBrokers } from "../../api/Broker";
import { useState } from "react";
import PageTitle from "../../components/PageTitle";
import useSetLoading from "../../lib/useSetLoading";
import queryString from "query-string";
import { Button, Col, Form, Input, Row, Select, Space, Typography } from "antd";
import { queryClient } from "../../lib/react-query";
import { ISearchBroker } from "../../types";
import BrokersTable from "../../components/BrokersTable";

const Brokers = () => {
  const [filter, setFilter] = useState<string>("");
  const [form] = Form.useForm();
  const { data: brokers, isLoading } = useQuery({
    queryKey: ["brokers", filter],
    queryFn: () => getBrokers(filter),
  });
  const handleSearch = (values: ISearchBroker) => {
    const { localities, sectors, isActive, ...rest } = values;

    // Convert boolean isActive to string "true" or "false", or leave undefined if not defined
    const isActiveParam =
      isActive !== undefined ? isActive.toString() : undefined;

    // Convert arrays to comma-separated strings, or leave as is if not an array
    const localitiesParam = Array.isArray(localities)
      ? localities.join(",")
      : localities;
    const sectorsParam = Array.isArray(sectors) ? sectors.join(",") : sectors;

    // Construct the query object with updated parameters
    const queryObj = {
      ...rest,
      isActive: isActiveParam,
      localities: localitiesParam,
      sectors: sectorsParam,
    };

    // Serialize the query object to a string
    const query = queryString.stringify(queryObj);

    // Set the filter state and invalidate the brokers query with the new filter
    setFilter(query);
    queryClient.invalidateQueries({ queryKey: ["brokers", query] });
  };

  useSetLoading(isLoading);
  return (
    <>
      <PageTitle title="Brokers" />
      <Form
        form={form}
        name="filterBrokers"
        layout="horizontal"
        onFinish={handleSearch}
        initialValues={{ isActive: true }}
      >
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col xs={24} sm={12} md={8} lg={6} xl={4} xxl={3}>
            <Form.Item name="name">
              <Input placeholder="Broker Name" />
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
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={4} xxl={3}>
            <Form.Item name="localities">
              <Select
                placeholder="Localities"
                allowClear
                showSearch
                mode="multiple"
                options={[
                  { value: "Domestic", label: "Domestic" },
                  { value: "Foreign", label: "Foreign" },
                ]}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={4} xxl={3}>
            <Form.Item name="isActive">
              <Select
                placeholder="Active"
                allowClear
                options={[
                  { value: true, label: "Active" },
                  { value: false, label: "Inactive" },
                ]}
              />
            </Form.Item>
          </Col>
          <Col>
            <Space>
              <Button type="primary" htmlType="submit">
                Search
              </Button>
              <Button
                type="primary"
                style={{ marginRight: "10px", backgroundColor: "green" }}
              >
                Export to Excel
              </Button>
              <Typography.Text type="success" strong>
                {brokers?.data?.length} Results
              </Typography.Text>
            </Space>
          </Col>
        </Row>
      </Form>
      <BrokersTable data={brokers?.data || []} />
    </>
  );
};

export default Brokers;
