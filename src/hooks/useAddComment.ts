import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { CommentPost, CommentResponse } from "../types";

const requestData = async (data: CommentPost): Promise<CommentResponse> => {
  try {
    const response = await axios.post<CommentResponse>("/comments", data);
    return response.data;
  } catch (error) {
    throw error as AxiosError;
  }
};

const useAddComment = (): UseMutationResult<CommentResponse, AxiosError, CommentPost> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: requestData,
    onMutate: (data) => {
      // old data
      const savedComments = queryClient.getQueryData<CommentResponse[]>(["comments", { postId: data.post_id }]);
      const newComments = { ...data, id: Date.now() }; // temporary id

      queryClient.setQueryData<CommentResponse[]>(["comments", { postId: data.post_id }], (oldComments) => {
        return oldComments ? [newComments, ...oldComments] : [newComments];
      });

      return () => {
        queryClient.setQueryData<CommentResponse[]>(["comments", { postId: data.post_id }], savedComments);
      };
    },
    onError: (_error, _variables, rollback) => {
      if (rollback) rollback();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"], exact: false });
    },
  });
};

export default useAddComment;
