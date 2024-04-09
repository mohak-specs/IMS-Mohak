import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBroker } from "../../api/Broker";
import { Button, Descriptions, Space, Tag } from "antd";
import type { DescriptionsProps } from "antd";
import { getDateWithTime } from "../../utils/getDate";
import useSetLoading from "../../lib/useSetLoading";
import PageTitle from "../../components/PageTitle";

const Broker = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: broker, isLoading } = useQuery({
    queryKey: ["broker", id],
    queryFn: () => getBroker(id as string),
  });
  useSetLoading(isLoading);
  const BrokerItems: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Name",
      children: <h4>{broker?.data?.name}</h4>,
    },
    {
      key: "2",
      label: "Location Type",
      children: broker?.data?.locationType,
    },
    {
      key: "3",
      label: "Comment",
      children: broker?.data?.comment,
      contentStyle: { whiteSpace: "pre-wrap" },
    },
    {
      key: "4",
      label: "Created At",
      children: getDateWithTime(broker?.data?.createdAt as string),
    },
    {
      key: "5",
      label: "Updated At",
      children: getDateWithTime(broker?.data?.updatedAt as string),
    },
    {
      key: "6",
      label: "isActive",
      children: broker?.data?.isActive ? "Yes" : "No",
    },
    {
      key: "7",
      label: "Sectors",
      children: (
        <>
          {broker?.data?.sectors?.map((sector, i) => (
            <Tag key={i}>{sector.toUpperCase()}</Tag>
          ))}
        </>
      ),
    },
  ];
  if (!broker) return <div>Broker not found</div>;
  return (
    <>
      <PageTitle title="Broker Details" />
      <Descriptions
        bordered
        items={BrokerItems}
        extra={
          <Space align="center">
            <Button
              onClick={() => navigate(`/broker/${id}/edit`)}
              type="primary"
            >
              Edit
            </Button>
            <Button
              type="primary"
              style={{ background: "#52c41a", borderColor: "#52c41a" }}
            >
              Export to Excel
            </Button>
          </Space>
        }
      />
    </>
  );
};

export default Broker;
