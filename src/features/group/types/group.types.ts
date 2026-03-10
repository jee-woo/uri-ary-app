export type MemberStatus = "ACCEPTED" | "PENDING";

export interface Group {
  id: number;
  name: string;
  code: string;
  status: MemberStatus;
  memberCount: number;
  lastDiaryAt: string | null;
}

interface Member {
  id: number;
  username: string;
  email: string;
}
export interface Diary {
  id: number;
  encryptedContent: string;
  authorUsername: string;
  createdAt: string;
  imageUrl: string;
}

export interface GroupDetail extends Group {
  code: string;
  members: Member[];
  diaries: Diary[];
}
