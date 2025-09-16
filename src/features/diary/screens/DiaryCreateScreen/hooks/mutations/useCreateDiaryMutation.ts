import { useMutation } from "@tanstack/react-query";
import { createDiary } from "../../services/api";

export const useCreateDiaryMutation = () => {
  return useMutation({
    mutationFn: createDiary,
  });
};
