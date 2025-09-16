import { z } from "zod";

export const DiarySchema = z.object({
  content: z.string().min(1, "내용을 입력해주세요."),
});

export type DiaryInput = z.infer<typeof DiarySchema>;
