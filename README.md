# Uriary - 우리들의 교환일기 앱

**Uriary**는 소중한 사람들과 함께 추억을 기록하고 공유하는 크로스플랫폼 소셜 일기 애플리케이션입니다.

<!-- <table>
  <tr>
    <td><img src="https://via.placeholder.com/200x400.png?text=Screen+1" alt="App Screenshot 1" width="200"/></td>
    <td><img src="https://via.placeholder.com/200x400.png?text=Screen+2" alt="App Screenshot 2" width="200"/></td>
    <td><img src="https://via.placeholder.com/200x400.png?text=Screen+3" alt="App Screenshot 3" width="200"/></td>
  </tr>
  <tr>
    <td><img src="https://via.placeholder.com/200x400.png?text=Screen+4" alt="App Screenshot 4" width="200"/></td>
    <td><img src="https://via.placeholder.com/200x400.png?text=Screen+5" alt="App Screenshot 5" width="200"/></td>
    <td><img src="https://via.placeholder.com/200x400.png?text=Screen+6" alt="App Screenshot 6" width="200"/></td>
  </tr>
</table> -->

## ✨ 주요 기능

- **소셜 로그인:** 간편하게 시작하는 사용자 인증 시스템
- **그룹 관리:** 그룹 생성, 참여, 초대 기능
- **교환일기:** 그룹 멤버들과 함께 작성하고 공유하는 일기
- **댓글:** 일기에 대한 멤버들의 소통 기능
- **사진 첨부:** 추억을 더 생생하게 기록하는 사진 업로드

## 🛠️ 기술 스택

| 분야                 | 기술                                 |
| :------------------- | :----------------------------------- |
| **Core**             | `React Native`, `Expo`, `TypeScript` |
| **UI**               | `Tamagui`                            |
| **상태 관리**        | `React Query (TanStack Query)`       |
| **라우팅**           | `React Navigation`                   |
| **폼 / 유효성 검사** | `React Hook Form`, `Zod`             |
| **API 클라이언트**   | `Axios`                              |
| **API 모킹**         | `Mock Service Worker (MSW)`          |

## 🏗️ 아키텍처

이 프로젝트는 **기능 단위 아키텍처 (Feature-Sliced Design)**를 채택하여 높은 응집도와 낮은 결합도를 유지합니다.

- **`src/features`**: `auth`, `group`, `diary` 등 각 도메인 기능별로 코드를 모듈화하여 관리합니다. 각 기능 폴더는 독립적으로 존재하며 자체적인 `components`, `hooks`, `services`, `types` 등을 가집니다.
- **`src/components`**: 여러 기능에서 재사용되는 공용 컴포넌트를 관리합니다.
- **`src/constants`, `src/types`**: 프로젝트 전반에서 사용되는 상수와 타입을 관리합니다.

이러한 구조는 코드의 추적을 용이하게 하고, 새로운 기능을 추가하거나 기존 기능을 수정할 때 발생하는 사이드 이펙트를 최소화하여 프로젝트의 확장성과 유지보수성을 크게 향상시킵니다.
