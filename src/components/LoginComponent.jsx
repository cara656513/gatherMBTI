import React, { useEffect, useState } from 'react'
import supabase from '../supabase'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Header } from './Header';
const Container = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
    justify-content: center;
    align-items: center;
    `
const Logincontainer = styled.div`
      width: 500px;
      height: 500px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

     `

const LoginTitle = styled.h1`
      font-size:  40px;
      margin-bottom: 50px;
     `
const InputonBox = styled.div`
      display: flex;
      margin-bottom: 30px;
      margin-top: 20px;
      gap: 10px;
     `
const Input = styled.input`
   width: 340px;
   height: 50px;
   font-size: 15px;
   border: 1px solid #ccc;
   border-radius: 10px;
`;


const LargeButton = styled.button`
    width: 150px;
    height: 55px;
    font-size: 18px;
    padding: 15px;
    border-radius: 20px;
    background-color: orange;
    border: none;
     `
const ButtonBox = styled.div`
      display: flex;
      justify-content: center;
      align-items: center;
height: auto;
width: auto;
flex-wrap: wrap;
gap: 10px;
     `
const Starbox = styled.span`
  color: orange;
`
const LoginComponent = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [user, setuser] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const signInUser = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) {
      console.error("로그인 실패:", error.message);
      console.log(error)
      setErrorMessage("로그인을 다시 시도해주세요")
    }
    else {
      console.log("로그인 성공:", data);


      setuser(data.user)
      navigate('/')
    }


  }
  const signUp = () => {
    navigate("/signup")
    
    }
    
  return (
    <>
      <Container>
   
        <Logincontainer>
          <LoginTitle>로그인</LoginTitle>
          <form action="" onSubmit={signInUser} >
            <span >이메일 <Starbox>*</Starbox></span>

            <InputonBox>
              <Input type="text" placeholder='이메일을 입력하세요' value={email} onChange={onChangeEmail} />
            </InputonBox>
            <span>비밀번호<Starbox>*</Starbox></span>


            <InputonBox>
              <Input type="password" placeholder='비밀번호를 입력하세요' value={password} onChange={onChangePassword} />
            </InputonBox>


            <ButtonBox>
              <p>{errorMessage}</p>
              <LargeButton type='submit'>로그인</LargeButton>
              
            </ButtonBox>

          </form>
        </Logincontainer>
      </Container>

    </>



  )
}

export default LoginComponent






