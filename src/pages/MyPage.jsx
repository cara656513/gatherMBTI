import { Link } from "react-router-dom";
import {
  HeaderWrapper,
  MenuWrapper,
  Wrapper,
  ImgBox,
  ImgWrapper,
  Title,
  ProfileImg,
  UserHiWrapper,
} from "../styles/MyPageStyles";
import { GlobalStyle } from "../styles/GlobalStyle";
import supabase from "../supabase";
import { useEffect, useState } from "react";

const PostFetchData = () => {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("posts").select("*");
      if (error) {
        console.log(error);
      } else {
        console.log(data);
        setDatas(data);
      }
    };
    fetchData();
  }, []);

  return (
    <ImgWrapper>
      {datas.map((data) => {
        return (
          <Link key={data.id} to="/detail">
            <ImgBox src={data.picture} />
          </Link>
        );
      })}
      <ImgBox />
      <ImgBox />
      <ImgBox />
      <ImgBox />
      <ImgBox />
      <ImgBox />
      <ImgBox />
    </ImgWrapper>
  );
};

const UserFetchData = () => {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("users").select("*");
      if (error) {
        console.log(error);
      } else {
        console.log(data);
        setDatas(data);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {datas.map((data) => {
        return (
          <UserHiWrapper key={data.id}>
            <ProfileImg src={data.profile_img}></ProfileImg>
            <div>안녕하세요, {data.name}님!</div>
          </UserHiWrapper>
        );
      })}
    </>
  );
};

const Header = () => {
  return (
    <HeaderWrapper>
      <Link to="/">모여라 mbti </Link>
      <MenuWrapper>
        <Link>어쩌구</Link>
        <Link>어쩌구</Link>
        <Link to="/newpost">새글쓰기</Link>
        <Link to="/mypage">마이페이지</Link>
      </MenuWrapper>
    </HeaderWrapper>
  );
};

const MyPage = () => {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Wrapper>
        <Title>마이페이지</Title>
        <UserFetchData />
        <PostFetchData />
      </Wrapper>
    </>
  );
};

export default MyPage;
