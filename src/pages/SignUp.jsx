import React, { useState } from "react";
import supabase from "../supabase";
import styled from "styled-components";
import { useEffect } from "react";

const Container = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeaderStyle = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
`

const ImgButton = styled.button`
  border-radius: 50%;
  width: 100px;
  height: 100px;
  background-color: orange; /* 배경색 설정 */
  border: 2px dashed black;
  cursor: pointer;
  font-size: 30px;
`

const SignUpInput = styled.div`
  display: flex;
  flex-direction: row;
`

const BasicInfor = styled.div`
  display: flex;
  flex-direction: column;
`

const AccountInfor = styled.div`
  display: flex;
  flex-direction: column;
`

const Inputstyle = styled.label`
  display: flex;
  flex-direction: column;
`

const SignUp = () => {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passWordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");
  const [nickName, setNickName] = useState("");
  const [mbti, setMbti] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.from("users").select("*");
      if (error) {
        return alert(error.message);
      }
      setUsers(data);
    }
    fetchUsers();
  },[])

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handlePasswordConfirmChange = (e) => {
    setPasswordConfirm(e.target.value);
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleNickNameChange = (e) => {
    setNickName(e.target.value);
  };
  const handleMbtiChange = (e) => {
    setMbti(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password.length < 8) {
      alert("비밀번호 8자 이상 입력해 주세요.");
      return;
    }

    if (password !== passWordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    alert("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.");

    setEmail("");
    setPassword("");
    setPasswordConfirm("");
    setName("");
    setNickName("");
    setMbti("");
  }

  return (
    <Container onSubmit={handleSubmit}>
      <HeaderStyle>
        <h3>모여라 MBTI</h3>
        <div>
        <p>로그인</p>
        <p>회원가입</p>
        </div>
      </HeaderStyle>
      <div>
        <p>회원가입</p>
        <ImgButton>+</ImgButton>
      </div>
      <SignUpInput>
      <BasicInfor>
        <Inputstyle>
          이름
          <input
            type="text"
            value={name}
            placeholder={"이름을 입력하세요"}
            onChange={handleNameChange}
            required
          />
        </Inputstyle>
        <Inputstyle>
          닉네임
          <input
            type="text"
            value={nickName}
            placeholder={"닉네임을 입력하세요"}
            onChange={handleNickNameChange}
            required
          />
        </Inputstyle>
        <Inputstyle>
          MBTI
          <select value={mbti} onChange={handleMbtiChange} required>
            <option value="">MBTI를 선택하세요</option>
            <option value="ISTJ">ISTJ</option>
            <option value="ISFJ">ISFJ</option>
            <option value="INFJ">INFJ</option>
            <option value="INTJ">INTJ</option>
            <option value="ISTP">ISTP</option>
            <option value="ISFP">ISFP</option>
            <option value="INFP">INFP</option>
            <option value="INTP">INTP</option>
            <option value="ESTP">ESTP</option>
            <option value="ESFP">ESFP</option>
            <option value="ENFP">ENFP</option>
            <option value="ENTP">ENTP</option>
            <option value="ESTJ">ESTJ</option>
            <option value="ESFJ">ESFJ</option>
            <option value="ENFJ">ENFJ</option>
            <option value="ENTJ">ENTJ</option>
          </select>
        </Inputstyle>
        </BasicInfor>
      <AccountInfor>
        <Inputstyle>
          이메일
          <input
            type="email"
            value={email}
            placeholder={"이메일을 입력하세요"}
            onChange={handleEmailChange}
            required
          />
        </Inputstyle>
        <Inputstyle>
          비밀번호
          <input
            type="password"
            value={password}
            placeholder={"비밀번호를 입력하세요"}
            onChange={handlePasswordChange}
            required
          />
        </Inputstyle>
        <Inputstyle>
          비밀번호 확인
          <input
            type="password"
            value={passWordConfirm}
            placeholder={"비밀번호를 재입력하세요"}
            onChange={handlePasswordConfirmChange}
            required
          />
        </Inputstyle>
      </AccountInfor>
      </SignUpInput>
      <button type="submit">가입하기</button>
    </Container>
  );
};

export default SignUp;
