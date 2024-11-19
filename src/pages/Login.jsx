import { Navigate, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate () ; 
  const Logout = async() => {
    const { data, error } = await supabase.auth.signOut();
    console.log("signout: ", { data, error }); // data는 딱히 필요없을 듯
    navigate("/login")
  }

  return (
    <>
      <Header />

      <LoginComponent />
    </>
  );
};

export default Login;
