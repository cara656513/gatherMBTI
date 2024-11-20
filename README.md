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
  MBTI가  같은 사람들끼리의 게시물을 모아서 볼수있는 SNS로 취미, 일상등을 공유하는 뉴스피드  
## 팀소개
| 역할  | 강란규 | 강민정 | 최혜진 | 박정은    | 박하은 |
|-------|--------|--------|--------|-----------|--------|
| FE    | ✔      |        | ✔      | ✔         | ✔      |
| TL    |        | ✔      |        |           |        |
| UL    |        |        |        | ✔         |        |




## 프로젝트 계기
 나와같은 MBTI 를 가진 사람들은 어떤 생각과 라이프스타일을 가지고 있고 MBTI가 같은 사람들을 모아놨을때  
어떤일들이 생길까? 라는 호기심에 시작하게되었습니다 

## 💜 주요기능


### 1. Supabase를 활용한  CRUD

- **supabase** 에서 제공하는 api를 이용하여 MBTI 게시물 CRUD 기능  

### 2. Supabase를 활용한 로그인, 회원 가입

- Authentication 에서 제공하는 api를 이용해서 아래 회원 가입, 로그인 기능 구현 
    - 아이디(이메일), 
    - 패스워드
### 3. Context API를 활용한 전역상태 관리 

-  
- 

### 4. RRD(React Router DOM) **`

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



## Trouble Shooting
