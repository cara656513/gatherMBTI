import { Header } from "../components/Header";
import LoginComponent from "../components/LoginComponent";

const Login = () => {
  return (
    <>
      <Header
        menus={[
          { route: "/newpost", menu: "글쓰기" },
          { route: "/mypage", menu: "마이 페이지" },
        ]}
      />
      <LoginComponent />
    </>
  );
};

export default Login;
