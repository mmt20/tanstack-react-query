import axios from "axios";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { PostItem, TPostStatus } from "../types";

export const fetchPosts = async (selectedPostStatus: TPostStatus, paginate: number): Promise<PostItem[]> => {
  const params: { _page: number; _limit: number; status?: TPostStatus } = {
    _page: paginate,
    _limit: 5,
    status: selectedPostStatus !== "all" ? selectedPostStatus : undefined,
  };

  const response = await axios.get<PostItem[]>("/posts", { params });
  return response.data;
};

const useGetPosts = (selectedPostStatus: TPostStatus, paginate: number): UseQueryResult<PostItem[]> => {
  const query = useQuery({
    queryKey: ["posts", "search", { selectedPostStatus, paginate }],
    queryFn: () => fetchPosts(selectedPostStatus, paginate),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 10 * 60 * 1000, // 10 minutes
  });

  return query;
};

export default useGetPosts;
