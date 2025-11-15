import axios from "axios";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

interface DataItem {
  userId: number;
  id: number;
  title: string;
  body: string;
  status: string;
  topRate: boolean;
}

const fetchPosts = async (): Promise<DataItem[]> => {
  const response = await axios.get<DataItem[]>("/posts");
  return response.data;
};
const useGetPosts = (): UseQueryResult<DataItem[]> => {
  const query = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    staleTime: 10 * 1000, // 10 seconds
  });

  return query;
};

export default useGetPosts;
