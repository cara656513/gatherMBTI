import { Header } from "../components/Header";
import LoginComponent from "../components/LoginComponent";

const Login = () => {
  return (
    <>
      <Header menus={[{ route: "/signup", menu: "회원가입" }]} />

      <LoginComponent />
    </>
  );
};

export default Login;
