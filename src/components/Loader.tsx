import { Spin } from "antd";
const Loader = ({ isLoading }: { isLoading: boolean }) => {
  return <Spin spinning={isLoading} size="large" fullscreen />;
};

export default Loader;
