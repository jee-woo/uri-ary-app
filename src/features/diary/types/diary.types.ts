export type Comment = {
  id: number;
  content: string;
  authorUsername: string;
  createdAt: string;
  parentId: number | null;
};

export type NestedComment = Comment & { replies: NestedComment[] };

export type DiaryDetail = {
  id: number;
  title: string;
  content: string;
  authorUsername: string;
  createdAt: string;
  comments: Comment[];
  imageUrl?: string;
};
