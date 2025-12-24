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
  authorUsername: string;
  createdAt: string;
  comments: Comment[];
  imageUrl?: string;
  encryptedContent: string;
  encryptedAesKey: string;
  iv: string;
  authTag: string;
};
