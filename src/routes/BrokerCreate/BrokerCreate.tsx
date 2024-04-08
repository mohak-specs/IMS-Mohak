import { Typography, Row, Col, Form, Input, Select, Button } from "antd";
import { useMemo } from "react";
import { useMutation } from "@tanstack/react-query";
import getCountryCodeByName from "../../lib/geoData";
import { Country, State } from "country-state-city";
import { createBroker } from "../../api/Broker";
import { IBrokerPostType } from "../../types";
import useLoadingStore from "../../store/useLoadingStore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { isAxiosError } from "axios";
import { queryClient } from "../../lib/react-query";
import PageTitle from "../../components/PageTitle";
const { Option } = Select;
const { Title } = Typography;

const BrokerCreate = () => {
  const { setIsLoading } = useLoadingStore();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: createBroker,
    onMutate: () => setIsLoading(true),
    onSuccess: (data) => {
      form.resetFields();
      toast.success(`${data.message}`, { id: "createBroker" });
      navigate("/broker");
      setIsLoading(false);
      queryClient.invalidateQueries({ queryKey: ["brokers"] });
    },
    onError: (error) => {
      setIsLoading(false);
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
        return;
      }
      toast.error(error.message);
    },
  });
  const [form] = Form.useForm();
  const selectedCountry: string = Form.useWatch("address.country", form);
  const getCityByCountry = useMemo(() => {
    const foundCountry = Country.getCountryByCode(
      getCountryCodeByName(selectedCountry)
    );
    return foundCountry ? State.getStatesOfCountry(foundCountry.isoCode) : [];
  }, [selectedCountry]);
  return (
    <>
      <PageTitle title="Create Broker" />
      <Form
        form={form}
        onFinish={(values: IBrokerPostType) =>
          mutation.mutate({ ...values, type: "broker" })
        }
      >
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
        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
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
                onChange={() => {
                  form.setFieldValue("address.state", undefined);
                }}
                options={Country.getAllCountries().map((country) => ({
                  label: country.name,
                  value: country.name,
                }))}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="State"
              name="address.state"
              rules={[{ required: true, message: "Please select the city" }]}
              dependencies={["address.country"]}
            >
              <Select
                placeholder="Select State"
                allowClear
                showSearch
                disabled={!form.getFieldValue("address.country")}
              >
                {getCityByCountry.map((city) => (
                  <Option key={city.name} value={city.name}>
                    {city.name}
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
