import { Wrapper } from "../styles/MyPageStyles";
import { Header } from "../components/Header";
import Footer from "../components/Footer";
import { PostFetchData } from "../components/mypageComponents/post";
import { UserFetchData } from "../components/mypageComponents/user";

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
      <Footer />
    </>
  );
};

export default MyPage;
