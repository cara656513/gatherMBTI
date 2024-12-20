import { Wrapper } from "../styles/MyPageStyles";
import { Header } from "../components/Header";
import UserFetchData from "../components/mypageComponents/UserFetchData";
import { PostFetchData } from "../components/mypageComponents/PostFetchData";

const MyPage = () => {
  return (
    <>
      <Header
        menus={[
          { route: "/newpost", menu: "글쓰기" },
          { menu: "로그아웃", type: "button" },
        ]}
      />
      <Wrapper>
        <UserFetchData />
        <PostFetchData />
      </Wrapper>
    </>
  );
};

export default MyPage;
