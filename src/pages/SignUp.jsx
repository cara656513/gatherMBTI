import React, { useState } from "react";
import ProfileImageUpload from "../components/signupComponents/ProfileImageUpload";
import MBTISelect from "../components/signupComponents/MBTISelect";
import InputField from "../components/signupComponents/InputField";
import { useNavigate } from "react-router-dom";
import supabase from "../supabase";
import {
  AccountInfor,
  BasicInfor,
  Container,
  SignUpButton,
  SignUpInput,
  Introduction,
} from "../styles/SignUpStyles";
import { Header } from "../components/Header";
import Footer from "../components/Footer";

const SignUp = () => {
  const navigate = useNavigate();
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

  const handleProfileTextChange = (e) => {
    setProfileText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 8) {
      alert("비밀번호 8자 이상 입력해 주세요.");
      return;
    }

    if (password !== passWordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const { data: basicData } = supabase.storage
      .from("profile_img")
      .getPublicUrl("default-profile.jpg");

    let profileImgUrl = basicData.publicUrl;

    if (profileImg) {
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("profile_img")
        .upload(`profiles/${Date.now()}_${profileImg.name}`, profileImg);

      if (uploadError) {
        alert(uploadError.message);
        return;
      }

      const { data } = supabase.storage
        .from("profile_img")
        .getPublicUrl(uploadData.path);
      profileImgUrl = data.publicUrl;
    }

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
          profile_img: profileImgUrl,
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

    alert("회원가입이 완료되었습니다.");

    navigate("/");

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
      <Header
        menus={[
          { route: "/login", menu: "로그인" },
          { route: "/signup", menu: "회원가입" },
        ]}
      />
      <ProfileImageUpload profileImg={profileImg} setProfileImg={setProfileImg}>
        회원가입
      </ProfileImageUpload>
      <SignUpInput>
        <BasicInfor>
          <InputField
            type={"text"}
            state={name}
            placeholder={"신짱구"}
            onChange={handleNameChange}
          >
            이름
          </InputField>
          <InputField
            type={"text"}
            state={nickName}
            placeholder={"burger_lover"}
            onChange={handleNickNameChange}
          >
            닉네임
          </InputField>
          <MBTISelect mbti={mbti} setMbti={setMbti}>
            MBTI
          </MBTISelect>
        </BasicInfor>
        <AccountInfor>
          <InputField
            type={"email"}
            state={email}
            placeholder={"example@example.com"}
            onChange={handleEmailChange}
          >
            이메일
          </InputField>
          <InputField
            type={"password"}
            state={password}
            placeholder={"password"}
            onChange={handlePasswordChange}
          >
            패스워드
          </InputField>
          <InputField
            type={"password"}
            state={passWordConfirm}
            placeholder={"password"}
            onChange={handlePasswordConfirmChange}
          >
            패스워드 확인
          </InputField>
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
      <SignUpButton type="submit">가입하기</SignUpButton>
      <Footer />
    </Container>
  );
};

export default SignUp;
