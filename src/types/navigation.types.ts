export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  DevLogin: undefined;
  OAuthRedirect: { code?: string };
  Group: { groupId: number };
  GroupCreate: undefined;
  DiaryCreate: { groupId: number };
  Diary: { groupId: number; diaryId: number };
  Setting: undefined;
};
