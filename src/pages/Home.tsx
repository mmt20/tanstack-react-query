import { Row, Col } from "react-bootstrap";
import PostList from "../components/PostList";
import PostFilter from "../components/PostFilter";
import { useState } from "react";
import { TPostStatus } from "../types";

const Home = () => {
  const [selectedPostStatus, setSelectedPostStatus] = useState<TPostStatus>("all");

  return (
    <Row>
      <Col xs={9}>
        <PostList selectedPostStatus={selectedPostStatus} />
      </Col>
      <Col>
        <PostFilter setSelectedPostStatus={setSelectedPostStatus} selectedPostStatus={selectedPostStatus} />
      </Col>
    </Row>
  );
};

export default Home;
