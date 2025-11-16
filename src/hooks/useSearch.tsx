import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { PostItem } from "../types";
import axios from "axios";

const fetchSearchResults = async (searchQuery: string): Promise<PostItem[]> => {
  const response = await axios.get<PostItem[]>(`/posts?q=${searchQuery}`);
  const data = response.data;
  return data;
};

const useSearch = (searchQuery: string): UseQueryResult<PostItem[]> => {
  const query = useQuery({
    queryKey: ["search", { searchQuery }],
    queryFn: () => fetchSearchResults(searchQuery),
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: searchQuery.length > 0,
  });
  return query;
};

export default useSearch;
