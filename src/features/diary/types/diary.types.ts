export type Comment = {
  id: number;
  content: string;
  authorUsername: string;
  createdAt: string;
  parentId: number | null;
};

export type NestedComment = Comment & {
  children: NestedComment[];
  parentAuthorUsername?: string;
};

export type DiaryDetail = {
  id: number;
  title: string;
  content: string;
  authorUsername: string;
  createdAt: string;
  comments: Comment[];
  imageUrl?: string;
};
