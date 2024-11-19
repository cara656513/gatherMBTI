import { Link } from "react-router-dom";
import {
  Wrapper,
  ImgBox,
  ImgWrapper,
  ProfileImg,
  UserHiWrapper,
} from "../styles/MyPageStyles";
import supabase from "../supabase";
import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import Footer from "../components/Footer";

const PostFetchData = () => {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("user_id", "bfc6916c-70ca-4def-890a-e99ecbc57ee3");
      if (error) {
        console.log(error);
      } else {
        console.log(data);
        setDatas(data);
      }
    };
    fetchData();
  }, []);

  const handleUpdatePost = async (e) => {
    console.log(e.target.id);

    const { data, error } = await supabase
      .from("posts")
      .update({ other_column: "otherValue" })
      .eq("some_column", "someValue")
      .select();
  };

  return (
    <ImgWrapper>
      {datas.map((data) => {
        return (
          <>
            <Link key={data.id} to="/detail">
              <ImgBox src={data.picture} />
            </Link>
            <button id={data.id} onClick={handleUpdatePost}>
              수정
            </button>
            <button>삭제</button>
          </>
        );
      })}
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
      {datas
        .filter((data) => data.id == "bfc6916c-70ca-4def-890a-e99ecbc57ee3")
        .map((data) => {
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

const MyPage = () => {
  return (
    <>
      <Header
        menus={[
          { route: "/newpost", menu: "글쓰기" },
          { route: "/mypage", menu: "마이 페이지" },
        ]}
      />
      <Wrapper>
        <UserFetchData />
        <PostFetchData />
      </Wrapper>
      <Footer />
    </>
  );
};

export default MyPage;
