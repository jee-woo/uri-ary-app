export interface Group {
  id: number;
  name: string;
}

interface Member {
  id: number;
  username: string;
  email: string;
}
interface Diary {
  id: number;
  title: string;
  content: string;
  authorUsername: string;
  createdAt: string;
  imageUrl: string;
}

export interface GroupDetail extends Group {
  code: string;
  members: Member[];
  diaries: Diary[];
}
