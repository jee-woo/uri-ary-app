import * as Colors from "@tamagui/colors";
import { createThemes, defaultComponentThemes } from "@tamagui/theme-builder";
// Claude 배경색(#FAF9F5)을 기반으로, 밝은 색에서 어두운 색 순서로 배치
const lightPalette = [
  "hsla(48, 33%, 97%, 1)", // 0: 메인 배경색 (#FAF9F5)
  "hsla(48, 20%, 93%, 1)", // 1: 카드 및 보조 배경
  "hsla(46, 15%, 89%, 1)", // 2: 구분선 및 보더
  "hsla(45, 12%, 84%, 1)", // 3: 비활성 요소
  "hsla(44, 8%, 68%, 1)", // 4: 매우 연한 텍스트
  "hsla(43, 6%, 58%, 1)", // 5: 보조 텍스트 1
  "hsla(42, 5%, 44%, 1)", // 6: 보조 텍스트 2
  "hsla(42, 4%, 34%, 1)", // 7: 본문 텍스트 1
  "hsla(44, 5%, 18%, 1)", // 8: 본문 텍스트 2
  "hsla(44, 5%, 11%, 1)", // 9: 강조 텍스트
  "hsla(44, 5%, 7%, 1)", // 10: 헤드라인/블랙
  "hsla(44, 5%, 11%, 1)", // 11: 텍스트 기본값
];

// 어두운 색에서 밝은 색 순서로 배치하여 가독성 유지
const darkPalette = [
  "hsla(60, 3%, 8%, 1)", // 0: 메인 다크 배경
  "hsla(60, 3%, 12%, 1)", // 1: 카드 및 보조 배경
  "hsla(60, 3%, 18%, 1)", // 2: 구분선 및 보더
  "hsla(60, 2%, 25%, 1)", // 3: 비활성 요소
  "hsla(40, 2%, 35%, 1)", // 4: 섀도우 대응색
  "hsla(40, 2%, 50%, 1)", // 5: 흐린 텍스트
  "hsla(40, 2%, 65%, 1)", // 6: 보조 텍스트
  "hsla(48, 5%, 80%, 1)", // 7: 본문 텍스트 1
  "hsla(48, 8%, 90%, 1)", // 8: 본문 텍스트 2
  "hsla(48, 33%, 97%, 1)", // 9: 밝은 강조 텍스트
  "hsla(0, 0%, 100%, 1)", // 10: 화이트
  "hsla(48, 33%, 97%, 1)", // 11: 텍스트 기본값 (미색)
];
const lightShadows = {
  shadow1: "rgba(0,0,0,0.02)",
  shadow2: "rgba(0,0,0,0.04)",
  shadow3: "rgba(0,0,0,0.06)",
  shadow4: "rgba(0,0,0,0.08)",
  shadow5: "rgba(0,0,0,0.12)",
  shadow6: "rgba(0,0,0,0.16)",
};

const darkShadows = {
  shadow1: "rgba(0,0,0,0.2)",
  shadow2: "rgba(0,0,0,0.3)",
  shadow3: "rgba(0,0,0,0.4)",
  shadow4: "rgba(0,0,0,0.5)",
  shadow5: "rgba(0,0,0,0.6)",
  shadow6: "rgba(0,0,0,0.7)",
};

const builtThemes = createThemes({
  componentThemes: defaultComponentThemes,

  base: {
    palette: {
      dark: darkPalette,
      light: lightPalette,
    },

    extra: {
      light: {
        ...Colors.green,
        ...Colors.red,
        ...Colors.yellow,
        ...lightShadows,
        shadowColor: lightShadows.shadow1,
        cardBackground: "hsla(0, 0%, 100%, 1)",
      },
      dark: {
        ...Colors.greenDark,
        ...Colors.redDark,
        ...Colors.yellowDark,
        ...darkShadows,
        shadowColor: darkShadows.shadow1,
        cardBackground: "hsla(0, 0%, 100%, 0.08)",
      },
    },
  },
  accent: {
    palette: {
      // 어두운 배경 위에서 사용 — 중간 채도의 로즈톤에서 밝게
      dark: [
        "hsla(350, 28%, 32%, 1)", // 0: 가장 어두운 로즈
        "hsla(350, 28%, 36%, 1)", // 1
        "hsla(350, 30%, 40%, 1)", // 2
        "hsla(350, 30%, 44%, 1)", // 3
        "hsla(350, 32%, 48%, 1)", // 4
        "hsla(350, 32%, 52%, 1)", // 5: 중간 포인트
        "hsla(350, 34%, 56%, 1)", // 6
        "hsla(350, 34%, 60%, 1)", // 7
        "hsla(350, 36%, 65%, 1)", // 8
        "hsla(350, 36%, 70%, 1)", // 9
        "hsla(48, 33%, 97%, 1)", // 10: 크림 화이트 (베이스와 통일)
        "hsla(48, 33%, 97%, 1)", // 11: 텍스트 기본값
      ],
      // 밝은 배경 위에서 사용 — 진한 로즈에서 연하게
      light: [
        "hsla(350, 30%, 20%, 1)", // 0: 가장 진한 로즈
        "hsla(350, 30%, 25%, 1)", // 1
        "hsla(350, 32%, 30%, 1)", // 2
        "hsla(350, 32%, 35%, 1)", // 3
        "hsla(350, 34%, 40%, 1)", // 4
        "hsla(350, 34%, 45%, 1)", // 5: 중간 포인트
        "hsla(350, 36%, 50%, 1)", // 6
        "hsla(350, 36%, 55%, 1)", // 7
        "hsla(350, 38%, 60%, 1)", // 8
        "hsla(350, 38%, 65%, 1)", // 9
        "hsla(60, 3%, 11%, 1)", // 10: 베이스 다크 텍스트와 통일
        "hsla(60, 3%, 11%, 1)", // 11: 텍스트 기본값
      ],
    },
  },
  // accent: {
  //   palette: {
  //     dark: [
  //       "hsla(108, 41%, 35%, 1)",
  //       "hsla(108, 41%, 38%, 1)",
  //       "hsla(108, 41%, 41%, 1)",
  //       "hsla(108, 41%, 43%, 1)",
  //       "hsla(108, 41%, 46%, 1)",
  //       "hsla(108, 41%, 49%, 1)",
  //       "hsla(108, 41%, 52%, 1)",
  //       "hsla(108, 41%, 54%, 1)",
  //       "hsla(108, 41%, 57%, 1)",
  //       "hsla(108, 41%, 60%, 1)",
  //       "hsla(250, 50%, 90%, 1)",
  //       "hsla(250, 50%, 95%, 1)",
  //     ],
  //     light: [
  //       "hsla(108, 41%, 21%, 1)",
  //       "hsla(108, 41%, 26%, 1)",
  //       "hsla(108, 41%, 31%, 1)",
  //       "hsla(108, 41%, 36%, 1)",
  //       "hsla(108, 41%, 41%, 1)",
  //       "hsla(108, 41%, 45%, 1)",
  //       "hsla(108, 41%, 50%, 1)",
  //       "hsla(108, 41%, 55%, 1)",
  //       "hsla(108, 41%, 60%, 1)",
  //       "hsla(108, 41%, 65%, 1)",
  //       "hsla(250, 50%, 95%, 1)",
  //       "hsla(250, 50%, 95%, 1)",
  //     ],
  //   },
  // },

  childrenThemes: {
    warning: {
      palette: {
        dark: Object.values(Colors.yellowDark),
        light: Object.values(Colors.yellow),
      },
    },
    error: {
      palette: {
        dark: Object.values(Colors.redDark),
        light: Object.values(Colors.red),
      },
    },
    success: {
      palette: {
        dark: Object.values(Colors.greenDark),
        light: Object.values(Colors.green),
      },
    },
  },
});

export type Themes = typeof builtThemes;

export const themes: Themes =
  process.env.TAMAGUI_ENVIRONMENT === "client" &&
  process.env.NODE_ENV === "production"
    ? ({} as any)
    : (builtThemes as any);
