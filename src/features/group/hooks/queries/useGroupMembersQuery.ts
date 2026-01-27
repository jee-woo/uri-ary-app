import { getGroupMembers } from "@/features/group/services/api";
import { useQuery } from "@tanstack/react-query";

export const useGroupMembersQuery = (groupId: number) => {
  return useQuery({
    queryKey: ["groupMembers", groupId],
    queryFn: () => getGroupMembers(groupId),
  });
};
