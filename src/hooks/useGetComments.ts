import axios from "axios";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { CommentResponse } from "../types";

const fetchComments = async (postId: string): Promise<CommentResponse[]> => {
  const response = await axios.get<CommentResponse[]>(`/comments?post_id=${postId}&_sort=id&_order=desc`);
  return response.data;
};

const useGetComments = (postId: string): UseQueryResult<CommentResponse[]> => {
  return useQuery({
    queryKey: ["comments", { postId: +postId }],
    queryFn: () => fetchComments(postId),
    staleTime: 5 * 60 * 1000,
  });
};

export default useGetComments;
