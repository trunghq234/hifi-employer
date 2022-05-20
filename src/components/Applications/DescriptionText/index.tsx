import { Col, Row } from "antd";

const DescriptionText = ({ title, description }: { title: string; description: JSX.Element }) => {
  return (
    <Row gutter={[20, 20]}>
      {title && (
        <Col span={3} className="font-semibold">
          {title}
        </Col>
      )}
      <Col span={20}>{description}</Col>
    </Row>
  );
};

export default DescriptionText;
