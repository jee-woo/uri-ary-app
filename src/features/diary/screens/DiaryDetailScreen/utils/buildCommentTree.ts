import { Comment, NestedComment } from "@/features/diary/types/diary.types";

export const buildCommentTree = (comments: Comment[]): NestedComment[] => {
  const map = new Map<number, NestedComment>();
  const roots: NestedComment[] = [];

  comments.forEach((comment) => {
    map.set(comment.id, { ...comment, replies: [] });
  });

  map.forEach((comment) => {
    if (comment.parentId === null) {
      roots.push(comment);
    } else {
      const parent = map.get(comment.parentId);
      parent?.replies.push(comment);
    }
  });

  return roots;
};
