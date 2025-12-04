import { Comment, NestedComment } from "@/features/diary/types/diary.types";

export const buildCommentTree = (comments: Comment[]): NestedComment[] => {
  if (!comments) return [];

  const map = new Map<number, NestedComment>();
  const roots: NestedComment[] = [];

  comments.forEach((comment) => {
    map.set(comment.id, { ...comment, children: [] });
  });

  map.forEach((comment) => {
    if (comment.parentId === null) {
      roots.push(comment);
    } else {
      const parent = map.get(comment.parentId);
      if (parent) {
        parent.children.push({
          ...comment,
          parentAuthorUsername: parent.authorUsername,
        });
      }
    }
  });

  return roots;
};
