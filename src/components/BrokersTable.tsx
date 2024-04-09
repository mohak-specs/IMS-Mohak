import { Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { Link } from "react-router-dom";
import { IBroker } from "../types";

const columns: TableProps<IBroker>["columns"] = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (_, { _id, name }) => <Link to={`/broker/${_id}`}>{name}</Link>,
  },
  {
    title: "Domestic/Foreign",
    dataIndex: "locationType",
    key: "locationType",
  },
  {
    title: "Locality",
    key: "address.locality",
    render: (_, { address }) => address.locality,
  },
  {
    title: "Sectors",
    dataIndex: "sectors",
    key: "sectors",
    render: (_, { sectors }) => (
      <>
        {sectors?.map((sector, i) => (
          <Tag key={i}>{sector.toUpperCase()}</Tag>
        ))}
      </>
    ),
  },
  {
    title: "Comment",
    dataIndex: "comment",
    key: "comment",
  },
  {
    title: "Action",
    key: "action",
    fixed: "right",
    width: 90,
    render: (_, record) => (
      <Space size="middle">
        <Link to={`/broker/${record._id}`}>View</Link>
        <Link to={`/broker/${record._id}/edit`}>Edit</Link>
      </Space>
    ),
  },
];
const BrokersTable = ({ data }: { data: IBroker[] }) => {
  return (
    <Table
      columns={columns}
      dataSource={data}
      sticky
      bordered
      pagination={false}
      rowKey={(record) => record._id as string}
      scroll={{ x: 992, y: 550 }}
      size="small"
      style={{ marginTop: "10px" }}
    />
  );
};

export default BrokersTable;
