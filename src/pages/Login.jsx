import { Header } from "../components/Header";
import LoginComponent from "../components/LoginComponent";
import styled from "styled-components";

const HeaderWrapper = styled.div`
  height: 100px;
  display: flex;
  justify-content: start;
  align-items: center;
  border-bottom: 1px solid #d8d8d8;
  position: fixed;
  top: 0;
  width: 100%;

  background-color: white;
  box-sizing: border-box;
`;
const Login = () => {
  return (
    <>
      <Header menus={[{ route: "/signup", menu: "회원가입" }]} />

      <LoginComponent />
    </>
  );
};

export default Login;
