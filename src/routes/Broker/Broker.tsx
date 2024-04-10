import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBroker } from "../../api/Broker";
import { Button, Descriptions, Popconfirm, Space, Tag, Typography } from "antd";
import { getDateWithTime } from "../../utils/getDate";
import AddressText from "../../components/AddressText";
import { IAddress } from "../../types";
import useSetLoading from "../../lib/useSetLoading";
import PageTitle from "../../components/PageTitle";
import PaginatedMemberTable from "../../components/PaginatedMemberTable";
import toast from "react-hot-toast";
import { MEMBERS } from "../../faker/member";
import { COVERAGES } from "../../faker/coverage";
import type { DescriptionsProps } from "antd";
import CoverageTable from "../../components/CoverageTable";
// import { IMember } from "../../types";

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
      label: "Locality",
      children: broker?.data?.address.locality,
    },
    {
      key: "4",
      label: "Comment",
      children: broker?.data?.comment,
      contentStyle: { whiteSpace: "pre-wrap" },
    },
    {
      key: "5",
      label: "Created At",
      children: getDateWithTime(broker?.data?.createdAt as string),
    },
    {
      key: "6",
      label: "Updated At",
      children: getDateWithTime(broker?.data?.updatedAt as string),
    },
    {
      key: "7",
      label: "isActive",
      children: broker?.data?.isActive ? "Yes" : "No",
    },
    {
      key: "7",
      label: "No of Members",
      children: broker?.data?.members?.length,
    },
    {
      key: "8",
      label: "Sectors",
      children: (
        <>
          {broker?.data?.sectors?.map((sector, i) => (
            <Tag key={i}>{sector.toUpperCase()}</Tag>
          ))}
        </>
      ),
    },
    {
      key: "9",
      label: "Address",
      children: <AddressText address={broker?.data?.address as IAddress} />,
    },
  ];
  if (!broker) return <div>Broker not found</div>;
  return (
    <>
      <PageTitle title="Broker Details" />
      <Descriptions
        style={{ marginBottom: 10 }}
        bordered
        items={BrokerItems}
        // layout="vertical"
        extra={
          <Space align="center" wrap>
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
      <div style={{ textAlign: "right" }}>
        <Popconfirm
          title="Are you sure to deactivate this broker?"
          onConfirm={() =>
            toast.success(`${broker?.data?.name} has been deactivated`)
          }
          okText="Yes"
          cancelText="No"
          placement="topLeft"
        >
          <Button type="primary" danger disabled>
            Deactivate Broker
          </Button>
        </Popconfirm>
      </div>
      <div style={{ marginBottom: 10 }} className="broker-members">
        <Typography.Title level={4}>Members</Typography.Title>
        {/* <PaginatedMemberTable members={broker?.data?.members as IMember[]} /> */}
        <PaginatedMemberTable members={MEMBERS} />
      </div>
      <div className="broker-coverages">
        <Typography.Title level={4}>Coverages</Typography.Title>
        <CoverageTable coverages={COVERAGES} />
      </div>
    </>
  );
};

export default Broker;
