export interface PostItem {
  userId: number;
  id: number;
  title: string;
  body: string;
  status: "publish" | "draft" | "block";
  topRate: boolean;
}

export type TPostStatus = "publish" | "draft" | "block" | "all";
