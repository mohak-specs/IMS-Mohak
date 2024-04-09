import { FloatButton } from "antd";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { FaSuitcase, FaMoneyBill, FaUser } from "react-icons/fa";
import { GiTalk } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

const AddFloatButton = () => {
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleNavigate = (pathname: string) => {
    navigate(pathname);
    setOpen(false);
  };
  return (
    <>
      <FloatButton.Group
        trigger="click"
        type="primary"
        icon={<IoMdAdd />}
        style={{ right: 24 }}
        open={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        <FloatButton
          onClick={() => handleNavigate("/interaction/create")}
          tooltip={<div>Add Interaction</div>}
          icon={<GiTalk />}
        />
        <FloatButton
          onClick={() => handleNavigate("/member/create")}
          tooltip={<div>Add Member</div>}
          icon={<FaUser />}
        />
        <FloatButton
          onClick={() => handleNavigate("/investor/create")}
          tooltip={<div>Add Investor</div>}
          icon={<FaSuitcase />}
        />
        <FloatButton
          onClick={() => handleNavigate("/broker/create")}
          tooltip={<div>Add Broker</div>}
          icon={<FaMoneyBill />}
        />
      </FloatButton.Group>
    </>
  );
};

export default AddFloatButton;
