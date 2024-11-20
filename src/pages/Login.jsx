import { Header } from "../components/Header";
import Footer from "../components/Footer";
import LoginComponent from "../components/LoginComponent";



const Login = () => {
  return (
    <>
      <Header
        menus={[
          {
            route: "/signup",
            menu: "회원가입",
          },
        ]}
      />
      <LoginComponent />
      <Footer />
    </>
  );
};

export default Login;
