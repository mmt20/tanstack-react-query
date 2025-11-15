import { Table, ButtonGroup, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import useGetPosts from "../hooks/useGetPosts";
import { TPostStatus } from "../types";

interface PostListProps {
  selectedPostStatus: TPostStatus;
}

const PostList = ({ selectedPostStatus }: PostListProps) => {
  const { data, isError, error, isLoading } = useGetPosts(selectedPostStatus);

  if (isError) {
    return <div>Error: {(error as Error).message}</div>;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Status</th>
          <th style={{ width: "10%" }}>Top Rate</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((post, index) => (
          <tr key={post.id}>
            <td>{index + 1}</td>
            <td>
              <Link to={`/info`}>{post.title}</Link>
            </td>
            <td>{post.status}</td>
            <td style={{ textAlign: "center" }}>
              <Form.Check // prettier-ignore
                type="switch"
                defaultChecked={post.topRate}
              />
            </td>
            <td>
              <ButtonGroup aria-label="Basic example">
                <Button variant="danger">Delete</Button>
              </ButtonGroup>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default PostList;
