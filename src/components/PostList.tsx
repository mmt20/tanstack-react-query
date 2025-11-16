import { Table, ButtonGroup, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import useGetPosts from "../hooks/useGetPosts";
import { TPostStatus } from "../types";
import useSearch from "../hooks/useSearch";

interface PostListProps {
  selectedPostStatus: TPostStatus;
  searchQuery: string;
}

const PostList = ({ selectedPostStatus, searchQuery }: PostListProps) => {
  const { data, isError, error, isLoading, isStale, refetch } = useGetPosts(selectedPostStatus);

  const {
    data: searchData,
    isError: isErrorSearch,
    error: errorSearch,
    isLoading: isLoadingSearch,
  } = useSearch(searchQuery);
  const displayData = searchQuery.length > 0 ? searchData : data;
  if (isError || isErrorSearch) {
    if (isError) return <div>Error: {(error as Error).message}</div>;
    if (isErrorSearch) return <div>Error: {(errorSearch as Error).message}</div>;
  }
  if (isLoading || isLoadingSearch) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {isStale && searchQuery.length === 0 && (
        <Button className="mb-3" onClick={() => refetch()}>
          Refetch Posts
        </Button>
      )}
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
          {displayData?.map((post, index) => (
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
    </>
  );
};

export default PostList;
