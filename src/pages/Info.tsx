import { useSearchParams } from "react-router-dom";
import useGetPost from "../hooks/useGetPost";
import { Col, Row } from "react-bootstrap";

const Info = () => {
  const [searchParams] = useSearchParams();

  const id = searchParams.get("id") as string;
  const type = searchParams.get("type") as string;
  const key = searchParams.get("key") as string;
  const { data, isError, error, isLoading } = useGetPost(id, type, key);

  if (isError) {
    return <div>Error: {(error as Error).message}</div>;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Row>
      <Col xs={6}>
        <div>
          <h4>Title:{data?.title}</h4>
          <p>Status:{data?.status}</p>
          <p>Top Rate:{data?.topRate ? "true" : "false"}</p>
          <p>Body:{data?.body}</p>
          <hr />
          <h4 className="mb-2">Comments:</h4>
          <p>Comment 1</p>
          <p>Comment 2</p>
        </div>
      </Col>
    </Row>
  );
};

export default Info;
