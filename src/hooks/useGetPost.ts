import { useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query";
import { PostItem } from "../types";
import axios from "axios";

const fetchPost = async (postId: string): Promise<PostItem> => {
  const response = await axios.get<PostItem>(`/posts/${postId}`);
  return response.data;
};

const useGetPost = (postId: string, paramType: string, ParamKey: string): UseQueryResult<PostItem> => {
  const queryClient = useQueryClient();

  let getChasedData: PostItem[] | undefined = [];

  if (paramType === "paginate") {
    getChasedData = queryClient.getQueryData<PostItem[]>([
      "posts",
      "search",
      { paginate: +ParamKey, selectedPostStatus: "all" },
    ]);
  }
  if (paramType === "search") {
    getChasedData = queryClient.getQueryData<PostItem[]>(["posts", "search", { searchQuery: ParamKey }]);
  }

  return useQuery({
    queryKey: ["post", { postId: +postId }],
    queryFn: () => fetchPost(postId),
    staleTime: 10 * 60 * 1000,
    initialData: () => {
      if (!getChasedData) return undefined;
      return getChasedData?.find((post) => post.id === +postId);
    },
  });
};

export default useGetPost;
