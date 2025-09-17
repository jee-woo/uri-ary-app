// src/mocks/handlers.ts
import type { Comment, DiaryDetail } from "@/features/diary/types/diary.types";
import type { Group, GroupDetail } from "@/features/group/types/group.types";
import { faker } from "@faker-js/faker";
import { http, HttpResponse } from "msw";

faker.seed(123);
// 헬퍼: ISO 날짜 다양하게 생성
function randomDateWithin(yearsAgo: number = 2): string {
  return faker.date
    .between({
      from: faker.date.past({ years: yearsAgo }),
      to: new Date(),
    })
    .toISOString();
}

// ─────────────── 그룹 리스트 (/api/groups/user) ───────────────
const groups: Group[] = Array.from({ length: 10 }).map((_, idx) => ({
  id: idx + 1,
  name: faker.word.words({ count: { min: 2, max: 4 } }),
}));

// ─────────────── 그룹 상세 (/api/groups/:groupId) ───────────────
const groupDetails: Record<number, GroupDetail> = Object.fromEntries(
  groups.map((group) => {
    const members = Array.from({
      length: faker.number.int({ min: 2, max: 5 }),
    }).map((_, idx) => ({
      id: group.id * 10 + idx,
      username: faker.internet.username(),
      email: faker.internet.email(),
    }));

    const diaries = Array.from({
      length: faker.number.int({ min: 1, max: 3 }),
    }).map((_, idx) => ({
      id: group.id * 100 + idx,
      content: faker.lorem.paragraph(),
      authorUsername: faker.helpers.arrayElement(members).username,
      createdAt: randomDateWithin(),
      imageUrl: faker.datatype.boolean()
        ? `https://placehold.co/300x300?text=Post+${String(
            group.id * 100 + idx
          )}`
        : "",
    }));

    return [
      group.id,
      {
        ...group,
        code: faker.string.alphanumeric(6).toUpperCase(),
        members,
        diaries,
      } satisfies GroupDetail,
    ];
  })
);

// ─────────────── 다이어리 상세 (/api/groups/:groupId/diaries/:diaryId) ───────────────
const diaryDetails: Record<number, DiaryDetail> = {};

for (const gd of Object.values(groupDetails)) {
  for (const d of gd.diaries) {
    // ==================================================================
    // START: 댓글 목업 데이터 생성 로직
    // ==================================================================
    const comments: Comment[] = Array.from({
      length: faker.number.int({ min: 2, max: 8 }),
    }).map((_, idx) => ({
      id: d.id * 1000 + idx, // 다이어리 ID 기반으로 고유 ID 생성
      content: faker.lorem.sentence({ min: 3, max: 20 }),
      authorUsername: faker.helpers.arrayElement(gd.members).username, // 그룹 멤버 중 랜덤으로 작성자 지정
      createdAt: faker.date
        .recent({ days: 10, refDate: d.createdAt }) // 다이어리 작성일 이후 날짜로 생성
        .toISOString(),
      parentId: null, // 우선 모두 최상위 댓글로 초기화
    }));

    // 대댓글(reply) 랜덤 생성
    comments.forEach((comment, index) => {
      // 첫 댓글은 대댓글이 될 수 없음
      if (index === 0) return;

      // 30% 확률로 대댓글로 전환
      if (faker.datatype.boolean({ probability: 0.3 })) {
        // 부모가 될 수 있는 댓글들 (자신보다 앞에 있고, 최상위 댓글인 것들)
        const potentialParents = comments
          .slice(0, index)
          .filter((c) => c.parentId === null);

        if (potentialParents.length > 0) {
          const parent = faker.helpers.arrayElement(potentialParents);
          comment.parentId = parent.id;
        }
      }
    });
    // ==================================================================
    // END: 댓글 목업 데이터 생성 로직
    // ==================================================================

    diaryDetails[d.id] = {
      id: d.id,
      title: faker.lorem.sentence(),
      content: d.content,
      authorUsername: d.authorUsername,
      createdAt: d.createdAt,
      comments: comments, // 생성된 댓글 데이터 할당
      imageUrl: d.imageUrl,
    };
  }
}

// ─────────────── Handlers ───────────────
export const handlers = [
  // 그룹 리스트
  http.get("/api/groups/user", () => {
    return HttpResponse.json(groups);
  }),

  // 그룹 상세
  http.get("/api/groups/:groupId", ({ params }) => {
    const { groupId } = params;
    const detail = groupDetails[Number(groupId)];
    if (!detail) {
      return HttpResponse.json({ message: "Not Found" }, { status: 404 });
    }
    return HttpResponse.json(detail);
  }),

  // 다이어리 상세
  http.get("/api/groups/:groupId/diaries/:diaryId", ({ params }) => {
    const { diaryId } = params;
    const detail = diaryDetails[Number(diaryId)];
    if (!detail) {
      return HttpResponse.json({ message: "Not Found" }, { status: 404 });
    }
    return HttpResponse.json(detail);
  }),

  // 댓글 작성
  http.post("/api/diaries/:diaryId/comments", async ({ request, params }) => {
    const body = (await request.json()) as Comment;
    const newComment: Comment = {
      id: faker.number.int({ min: 1000, max: 9999 }),
      content: body.content || faker.lorem.sentence(),
      authorUsername: body.authorUsername,
      createdAt: new Date().toISOString(),
      parentId: body.parentId ?? null,
    };
    const detail = diaryDetails[Number(params.diaryId)];
    if (detail) {
      detail.comments.push(newComment);
    }
    return HttpResponse.json(newComment);
  }),

  // 다이어리 작성
  http.post("/api/groups/:groupId/diaries", async ({ request, params }) => {
    const body = (await request.json()) as DiaryDetail;
    const newDiary = {
      id: faker.number.int({ min: 1000, max: 9999 }),
      content: body?.content || faker.lorem.paragraph(),
      authorUsername: body?.authorUsername,
      createdAt: new Date().toISOString(),
      imageUrl: body.imageUrl || "",
    };
    const detail = groupDetails[Number(params.groupId)];
    if (detail) {
      // diaries 타입 호환성을 위해 comments 필드를 빈 배열로 추가
      detail.diaries.push({ ...newDiary });
    }
    // 클라이언트에는 comments 필드를 제외하고 반환할 수 있음
    return HttpResponse.json(newDiary);
  }),
];
