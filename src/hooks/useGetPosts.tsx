import axios from "axios";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { PostItem, TPostStatus } from "../types";

const fetchPosts = async (selectedPostStatus: TPostStatus): Promise<PostItem[]> => {
  const response = await axios.get<PostItem[]>(
    `/posts${selectedPostStatus !== "all" ? `?status=${selectedPostStatus}` : ""}`
  );
  return response.data;
};
const useGetPosts = (selectedPostStatus: TPostStatus): UseQueryResult<PostItem[]> => {
  const query = useQuery({
    queryKey: ["posts", "search", { selectedPostStatus }],
    queryFn: () => fetchPosts(selectedPostStatus),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 10 * 60 * 1000, // 10 minutes
  });

  return query;
};

export default useGetPosts;
