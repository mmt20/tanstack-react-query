import { useSearchParams } from "react-router-dom";
import useGetPost from "../hooks/useGetPost";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useState } from "react";
import useAddComment from "../hooks/useAddComment";
import useGetComments from "../hooks/useGetComments";

const Info = () => {
  const [searchParams] = useSearchParams();
  const [comment, setComment] = useState("");
  const id = searchParams.get("id") as string;
  const type = searchParams.get("type") as string;
  const key = searchParams.get("key") as string;
  const { data, isError, error, isLoading } = useGetPost(id, type, key);
  const addComment = useAddComment();
  const getComments = useGetComments(id);
  if (isError) {
    return <div>Error: {(error as Error).message}</div>;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addComment.mutate({ post_id: +id, body: comment }, { onSuccess: () => setComment("") });
  };
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
          <Form className="mb-3" onSubmit={submitHandler}>
            <Form.Group className="mb-3">
              <Form.Control as="textarea" rows={3} value={comment} onChange={(e) => setComment(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={addComment.isPending}>
              Submit
            </Button>
          </Form>
          {getComments.isLoading ? (
            <p>Loading Comments</p>
          ) : (
            getComments.data?.map((el) => <p key={el.id}>{el.body}</p>)
          )}
        </div>
      </Col>
    </Row>
  );
};

export default Info;
