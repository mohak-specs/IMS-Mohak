import {
  Typography,
  Divider,
  Row,
  Col,
  Form,
  Input,
  Select,
  Button,
} from "antd";
import { useMemo } from "react";
import { country_arr, city_arr } from "../../lib/geoData";
const { Option } = Select;
const { Title } = Typography;

const BrokerCreate = () => {
  const [form] = Form.useForm();
  const selectedCountry: String = Form.useWatch("address.country", form);
  const citiesByCountry = useMemo(() => {
    const countryIndex = country_arr.findIndex((country) => {
      return country === selectedCountry;
    });
    const cities = city_arr[countryIndex + 1]?.split("|");
    return cities;
  }, [selectedCountry]);
  const handleSubmit = (values: any) => {
    console.log(values);
  };
  return (
    <>
      <Title level={3}>Create Broker</Title>
      <Divider style={{ margin: "0px" }} />
      <Form form={form} style={{ marginTop: "8px" }} onFinish={handleSubmit}>
        <Title level={5}>Basic Information</Title>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Broker Name"
              name="name"
              rules={[
                { required: true, message: "Please input the broker name" },
              ]}
            >
              <Input type="text" placeholder="Name" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Domestic/Foreign"
              name="locationType"
              rules={[
                { required: true, message: "Please select location type" },
              ]}
            >
              <Select placeholder="Select Location Type" allowClear>
                <Option value="Domestic">Domestic</Option>
                <Option value="Foreign">Foreign</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col xs={24}>
            <Form.Item
              label="Comment"
              name="comment"
              rules={[{ required: true, message: "Please input the comment" }]}
            >
              <Input.TextArea placeholder="Comment" rows={3} autoSize />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Sectors"
              name="sectors"
              rules={[{ required: true, message: "Please select sectors" }]}
            >
              <Select mode="multiple" placeholder="Select Sectors" allowClear>
                <Option value="Equity">Equity</Option>
                <Option value="Debt">Debt</Option>
                <Option value="Fixed Income">Fixed Income</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Title level={5}>Address Details</Title>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col xs={24} sm={12}>
            <Form.Item label="Address Line 1" name="address.streetLine1">
              <Input type="text" placeholder="Address Line 1" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item label="Address Line 2" name="address.streetLine2">
              <Input type="text" placeholder="Address Line 2" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Country"
              name="address.country"
              rules={[{ required: true, message: "Please select country" }]}
            >
              <Select
                placeholder="Select Country"
                allowClear
                showSearch
                virtual
              >
                {country_arr.map((country, i) => (
                  <Option key={i} value={country}>
                    {country}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="City"
              name="address.city"
              rules={[{ required: true, message: "Please select the city" }]}
              dependencies={["address.country"]}
            >
              <Select
                placeholder="Select City"
                allowClear
                showSearch
                disabled={Boolean(!selectedCountry)}
              >
                {citiesByCountry?.map((city) => (
                  <Option key={city} value={city}>
                    {city}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Region"
              name="address.region"
              rules={[{ required: true, message: "Please input the region" }]}
            >
              <Input type="text" placeholder="Region" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Postal Code"
              name="address.postalCode"
              rules={[
                { required: true, message: "Please input the postal code" },
              ]}
            >
              <Input
                type="text"
                placeholder="Postal Code"
                count={{ max: 12 }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Button type="primary" htmlType="submit">
          Add Broker
        </Button>
      </Form>
    </>
  );
};

export default BrokerCreate;
