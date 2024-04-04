import React from "react";
import { Divider, Skeleton, Row, Col } from "antd";

interface ContentSkeletonProps {
  inputCount?: number;
}

const ContentSkeleton: React.FC<ContentSkeletonProps> = ({
  inputCount = 5,
}) => {
  return (
    <>
      <Skeleton.Input style={{ marginBottom: 12 }} />
      <Divider style={{ margin: "12px 0" }} />
      <Row gutter={[16, 16]}>
        {Array.from({ length: inputCount }).map((_, index) => (
          <Col span={24} key={index}>
            <Skeleton.Input
              active
              size="large"
              style={{ marginBottom: 12 }}
              block
            />
          </Col>
        ))}
      </Row>
      <Skeleton.Button style={{ width: "100%", marginTop: 16 }} />
    </>
  );
};

export default ContentSkeleton;
