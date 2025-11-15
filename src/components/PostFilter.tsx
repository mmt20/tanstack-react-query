import { Form } from "react-bootstrap";
import { TPostStatus } from "../types";

interface PostFilterProps {
  setSelectedPostStatus: (status: TPostStatus) => void;
  selectedPostStatus: TPostStatus;
}

const PostFilter = ({ selectedPostStatus, setSelectedPostStatus }: PostFilterProps) => {
  const handelStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPostStatus(e.target.value as TPostStatus);
  };
  return (
    <>
      <h5>Filter By Status</h5>
      <Form.Select value={selectedPostStatus} onChange={handelStatusChange}>
        <option value="all">Select Status</option>
        <option value="publish">Publish</option>
        <option value="draft">Draft</option>
        <option value="block">Block</option>
      </Form.Select>
    </>
  );
};

export default PostFilter;
