import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { IMember } from "../types";
import { Input, Table, type TableColumnsType } from "antd";
const columns: TableColumnsType<IMember> = [
  {
    title: "Name",
    key: "name",
    render: (_, { _id, name }) => <Link to={`/member/${_id}`}>{name}</Link>,
    sorter: {
      compare: (a, b) => {
        return a.name.toString().localeCompare(b.name.toString());
      },
      multiple: 3,
    },
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    sorter: {
      compare: (a, b) => {
        return a.email.toString().localeCompare(b.email.toString());
      },
      multiple: 2,
    },
  },
  {
    title: "Designation",
    dataIndex: "designation",
    key: "designation",
    sorter: {
      compare: (a, b) => {
        return a.designation.toString().localeCompare(b.designation.toString());
      },
      multiple: 1,
    },
  },
  {
    title: "Comment",
    dataIndex: "comment",
    key: "comment",
  },
  {
    title: "Mobile Number",
    key: "mobileNumber",
    render: (_, { mobileNumber }) => (
      <>
        {mobileNumber?.dialCode} {mobileNumber?.number}
      </>
    ),
  },
  {
    title: "Office Number",
    key: "officeNumber",
    render: (_, { officeNumber }) => (
      <>
        {officeNumber?.dialCode} {officeNumber?.number}
      </>
    ),
  },
];

const BrokerMemberTable = ({ members }: { members: IMember[] }) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  // Filter members based on search
  const filteredMembers = useMemo(() => {
    return members.filter((member) =>
      member.name.toLowerCase().startsWith(search.toLowerCase())
    );
  }, [members, search]);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };
  return (
    <>
      <Input
        value={search}
        onChange={handleSearch}
        size="middle"
        placeholder="Search By Name"
      />
      <Table
        columns={columns}
        dataSource={filteredMembers}
        sticky
        bordered
        pagination={{
          size: "small",
          pageSize: pageSize,
          showSizeChanger: true,
          onShowSizeChange: (_, size) => {
            setPageSize(size);
          },
          onChange: (current) => {
            setPage(current);
          },
          current: page,
          pageSizeOptions: ["10", "25", "50", "100"],
          responsive: true,
          total: filteredMembers.length,
        }}
        rowKey={(record) => record._id as string}
        scroll={{ x: 992, y: 550 }}
        size="small"
        style={{ marginTop: "10px" }}
      />
    </>
  );
};

export default BrokerMemberTable;
