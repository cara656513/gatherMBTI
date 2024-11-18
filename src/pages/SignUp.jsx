import React, { useState } from "react";
import supabase from "../supabase";
import {
  AccountInfor,
  BasicInfor,
  Container,
  HeaderStyle,
  ImgLabel,
  InputStyle,
  LabelStyle,
  SignUpButton,
  SignUpInput,
  SelectStyle,
  LoginSignUp,
  LoginButton,
  SignUpImg,
  StarText,
  Introduction,
  PlusImgInput,
  PlusImgStyle,
} from "../styles/SignUpStyles";

const SignUp = () => {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passWordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");
  const [nickName, setNickName] = useState("");
  const [mbti, setMbti] = useState("");
  const [profileImg, setProfileImg] = useState(null);
  const [profileText, setProfileText] = useState("");

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

  const handleProfileImgChange = (e) => {
    setProfileImg(e.target.files[0]);
  };

  const handleProfileTextChange = (e) => {
    setProfileText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data: userData, error: userError } = await supabase.auth.signUp({
      email,
      password,
    });
    if (userError) {
      alert(userError.message);
      return;
    }
    setUsers(userData.user);

    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          name,
          nickname: nickName,
          profile_img: profileImg,
          profile_text: profileText,
          mbti,
        },
      ])
      .select();
    if (error) {
      alert(error.message);
      return;
    }
    setUsers([...users, ...data]);

    const { data: storageData } = supabase.storage
      .from("avatars")
      .getPublicUrl("default-profile.jpg");

    if (password.length < 8) {
      alert("비밀번호 8자 이상 입력해 주세요.");
      return;
    }

    if (password !== passWordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    alert("회원가입이 완료되었습니다.");

    setEmail("");
    setPassword("");
    setPasswordConfirm("");
    setName("");
    setNickName("");
    setMbti("");
    setProfileImg(null);
    setProfileText("");
  };

  return (
    <Container onSubmit={handleSubmit}>
      <HeaderStyle>
        <h3>모여라 MBTI</h3>
        <LoginSignUp>
          <LoginButton type="button">로그인</LoginButton>
          <SignUpButton type="button">회원가입</SignUpButton>
        </LoginSignUp>
      </HeaderStyle>
      <SignUpImg>
        <p>회원가입</p>
        <ImgLabel htmlFor="fileInput">
          {profileImg ? (
            <PlusImgStyle id="fileInput" src={profileImg} alt="ProfileImg" />
          ) : (
            "+"
          )}
          <PlusImgInput
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleProfileImgChange}
          />
        </ImgLabel>
      </SignUpImg>
      <SignUpInput>
        <BasicInfor>
          <LabelStyle>
            <p>
              이름<StarText>*</StarText>
            </p>
            <InputStyle
              type="text"
              value={name}
              placeholder={"신짱구"}
              onChange={handleNameChange}
              required
            />
          </LabelStyle>
          <LabelStyle>
            <p>
              닉네임<StarText>*</StarText>
            </p>
            <InputStyle
              type="text"
              value={nickName}
              placeholder={"burger_lover"}
              onChange={handleNickNameChange}
              required
            />
          </LabelStyle>
          <LabelStyle>
            <p>
              MBTI<StarText>*</StarText>
            </p>
            <SelectStyle value={mbti} onChange={handleMbtiChange} required>
              <option value="">MBTI 선택</option>
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
            </SelectStyle>
          </LabelStyle>
        </BasicInfor>
        <AccountInfor>
          <LabelStyle>
            <p>
              이메일<StarText>*</StarText>
            </p>
            <InputStyle
              type="email"
              value={email}
              placeholder={"example@example.com"}
              onChange={handleEmailChange}
              required
            />
          </LabelStyle>
          <LabelStyle>
            <p>
              패스워드<StarText>*</StarText>
            </p>
            <InputStyle
              type="password"
              value={password}
              placeholder={"passward"}
              onChange={handlePasswordChange}
              required
            />
          </LabelStyle>
          <LabelStyle>
            <p>
              패스워드 확인<StarText>*</StarText>
            </p>
            <InputStyle
              type="password"
              value={passWordConfirm}
              placeholder={"passward"}
              onChange={handlePasswordConfirmChange}
              required
            />
          </LabelStyle>
        </AccountInfor>
      </SignUpInput>
      <label>
        소개글
        <Introduction
          type="text"
          value={profileText}
          placeholder={"자신을 표현해주세요."}
          onChange={handleProfileTextChange}
        />
      </label>
      <SignUpButton>가입하기</SignUpButton>
    </Container>
  );
};

export default SignUp;
