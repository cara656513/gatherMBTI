# 프로젝트 이름

## 📖 목차
1. [프로젝트 소개](#프로젝트-소개)
2. [팀소개](#팀소개)
3. [프로젝트 계기](#프로젝트-계기)
4. [주요기능](#주요기능)
5. [개발기간](#개발기간)
6. [기술스택](#기술스택)
7. [서비스 구조](#서비스-구조)
8. [와이어프레임](#와이어프레임)
9. [API 명세서](#API-명세서)
10. [ERD](#ERD)
11. [프로젝트 파일 구조](#프로젝트-파일-구조)
12. [Trouble Shooting](#trouble-shooting)
    
## 👨‍🏫 프로젝트 소개
MBTI가  같은 사람들끼리의 게시물을 모아서 볼 수 있는 SNS로 취미, 일상 등을 공유하는 뉴스피드

## 팀소개
| 역할  | 강란규 | 강민정 | 최혜진 | 박정은    | 박하은 |
|-------|--------|--------|--------|-----------|--------|
| FE    | ✔      |        | ✔      | ✔         | ✔      |
| TL    |        | ✔      |        |           |        |
| UL    |        |        |        | ✔         |        |

## 프로젝트 계기
나와 같은 MBTI를 가진 사람들은 어떤 생각과 라이프스타일을 가지고 있고 MBTI가 같은 사람들을 모아놨을 때  
어떤 일들이 생길까? 라는 호기심에 시작하게 되었습니다 

## 💜 주요기능
### 1. Supabase를 활용한  CRUD
- **supabase** 에서 제공하는 api를 이용하여 MBTI 게시물 CRUD 기능  

### 2. Supabase를 활용한 로그인, 회원 가입
- Authentication 에서 제공하는 api를 이용해서 아래 회원 가입, 로그인 기능 구현 
    - 아이디(이메일)
    - 패스워드

### 3. Context API를 활용한 전역상태 관리 
-  createContext(), ContextProvider, useContext를 활용한 전역데이터 관리

### 4. RRD(React Router DOM)
- 각 페이지를 라우트 돔을 이용해서 구현
- 헤더는 링크를 이용해서 공통으로 구현

### 5. 마이 페이지
- 내 게시물 보기
- 프로필 수정 기능
   
### 6. 배포하기
- Vercel 이라는 호스팅플랫폼을 이용해 배포
- 배포에 적용될 브랜치는 main 브랜치로 적용

## ⏲️ 개발기간
- 2024.11.18(월) ~ 2024.11.21(목)

## 📚️ 기술스택

### ✔️ Supabase 

### ✔️ React 

### ✔️ React-router-dom

### ✔️ styleld.component 

### ✔️ javascript

### ✔️  Html 

## 서비스 구조
 
![서비스-구조-001](https://github.com/user-attachments/assets/92186b7f-bc18-444e-9843-dcdcf99cc847)

## 와이어프레임

![스크린샷 2024-11-15 오후 8 23 07](https://github.com/user-attachments/assets/61c4e5cf-9cad-4fdd-9c59-331f5174d542)

## ux/ui

![화면 캡처 2024-11-20 175304](https://github.com/user-attachments/assets/86e8f8a5-7635-4abe-b4d5-d7e95a515b48)

## ERD

![image (1)](https://github.com/user-attachments/assets/82a3f2fc-7dd2-47fe-803c-26629506237d)

## 프로젝트 파일 구조
```
gatherMBTI/
├── public/
├── src/
│   ├── api/
│   ├── assets/
│   ├── fonts/
│   ├── images/
│   ├── icons/
│   ├── components/
│   ├── pages/
│   ├── shared/
│   ├── styles/
│   └── utils/
├── README.md              # 프로젝트 설명 파일
├── eslint.config.js       # ESLint 설정 파일
├── index.html             # 애플리케이션 진입 HTML
├── package.json           # 프로젝트 메타데이터 및 의존성
├── pull_request_template.md # 풀 리퀘스트 템플릿
├── vite.config.js         # Vite 설정 파일
└── yarn.lock              # Yarn 패키지 버전 잠금 파일
```



## 코드

![image](https://github.com/user-attachments/assets/c73a48fe-555b-4c0f-af1a-e60de81a8a0a)
- create/signup : auth 경로에 회원 가입 후, 저희가 만든 user 테이블에 넣는 코드를 구현하였습니다.

![image](https://github.com/user-attachments/assets/bbbd6a0e-9c69-4b28-aad4-510085812776)
- update, read/댓글 : 수파베이스에 댓글 추가후, setComments를 통해 화면에 바로 보여지게 구현하였습니다

![image](https://github.com/user-attachments/assets/578e90d3-f92a-4ce8-8aa0-08725a986620)
- delete/게시물 삭제 : 수파베이스 delete 코드를 사용해 게시물 삭제 구현하였습니다.

## trouble shooting
![image](https://github.com/user-attachments/assets/861a1057-65d8-42af-bc88-8d63805c913f)
![image](https://github.com/user-attachments/assets/8fc718d7-851f-47fb-be76-1f49386bc801)
↓↓↓
![image](https://github.com/user-attachments/assets/32a2de12-0aeb-43be-9fb2-55e8300a7634)
![image](https://github.com/user-attachments/assets/0b27c60a-6656-46eb-879d-70337b796145)

- 각자 수파베이스 코드를 작성한 후에 컨텍스트 API 통일을 시도하는 과정에서 에러가 발생하였습니다.
