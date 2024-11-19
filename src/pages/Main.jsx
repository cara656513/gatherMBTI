import { useEffect, useState } from "react";
import supabase from "../supabase";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import MbtiFeatures from "../shared/MbtiFeatures";
import {
  MainBox,
  MainCategory,
  MainCategoryMbti,
  MainCategoryMbtiSub,
  MainCategoryHashtag,
  PostboxWrapper,
  Postbox,
  PostboxImage,
  PostboxContent,
  Userbox,
  UserboxImage,
  UserboxId,
  HomeBox,
  HomeLogo,
  HomeLogoText,
  SignUpButton,
  MainCategoryHashtagWrapper,
} from "../styles/MainStyles";
import Footer from "../components/Footer";

const Main = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [userMbti, setUserMbti] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {

      // 현재 로그인 된 사용자 데이터 가져오기

      const { data: userData, error: userError } =
        await supabase.auth.getUser();
      if (userError) {
        console.error("사용자 정보 불러오기 실패 : ", userError);
        return;
      }
      console.log("userData : ", userData);
      setCurrentUser(userData.user);


      // 전체 사용자 데이터 가져오기

      const { data: allUsers, error: usersError } = await supabase
        .from("users")
        .select("*");
      if (usersError) {
        console.error("전체 사용자 정보 불러오기 실패 : ", usersError);
        return;
      }
      console.log("allUsers : ", allUsers);
      setUsers(allUsers);


      // 현재 로그인된 사용자의 MBTI 정보 설정
      if (userData.user) {
        const loggedInUser = allUsers.find(
          (user) => user.id === userData.user.id
        );
        if (loggedInUser) {
          setUserMbti(loggedInUser.mbti);
        }
      }

      // 게시글 데이터 가져오기
      const { data: postData, error: postsError } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });
      if (postsError) {
        console.error("Error fetching posts:", postsError);
        return;
      }
      setPosts(postData);
    };

    fetchData();
  }, []);

  const filteredPosts = posts.filter((post) => {
    const user = users.find((user) => user.id === post.user_id);
    return user && user.mbti === userMbti;
  });


  return (
    <>
      <Header currentUser={currentUser} />

      <MainBox>
        {currentUser ? (
          // 로그인 후 페이지
          <>
            <MainCategory>
              <MainCategoryMbti>
                {MbtiFeatures.filter(({ MBTI }) => MBTI === userMbti).map(
                  ({ MBTI }) => (
                    <div key={MBTI}>{MBTI}</div>
                  )
                )}
              </MainCategoryMbti>
              <MainCategoryMbtiSub>
                {MbtiFeatures.filter(({ MBTI }) => MBTI === userMbti).map(
                  ({ feature }) => (
                    <div key={feature}>{feature}</div>
                  )
                )}
              </MainCategoryMbtiSub>
              <MainCategoryHashtagWrapper>
                {MbtiFeatures.filter(({ MBTI }) => MBTI === userMbti).map(
                  ({ hashTag }) =>
                    hashTag.map((tag) => (
                      <MainCategoryHashtag key={tag}>
                        #{tag}
                      </MainCategoryHashtag>
                    ))
                )}
              </MainCategoryHashtagWrapper>
            </MainCategory>

            <PostboxWrapper>
              {filteredPosts.map((post) => {
                const user = users.find((user) => user.id === post.user_id);

                return (
                  <Postbox key={post.id}>
                    <PostboxImage
                      src={post.picture}
                      alt="Post image"
                      onClick={() => {
                        navigate(`/detail/${post.id}`);
                      }}
                    />
                    <PostboxContent
                      onClick={() => {
                        navigate(`/detail/${post.id}`);
                      }}
                    >
                      {post.content}
                    </PostboxContent>

                    <Userbox key={user ? user.id : post.id}>
                      <UserboxImage
                        src={
                          user?.profile_img || "src/images/empty_profile.jpg"
                        }
                        alt="Userbox image"
                      />
                      <UserboxId
                        onClick={() => {
                          navigate(`/mypage/${user.id}`);
                        }}
                      >
                        {user ? user.nickname : "Unknown User"}
                      </UserboxId>

                    </Userbox>
                  </Postbox>
                );
              })}
            </PostboxWrapper>
          </>
        ) : (
          // 로그인 전 페이지
          <>
            <HomeBox>
              <HomeLogo src="src\images\logo2.svg" />
              <HomeLogoText>
                같은 <span>MTBI</span>끼리
                <br />
                모아보는 공감 스토리
              </HomeLogoText>
              <SignUpButton
                onClick={() => {
                  navigate("/signup");
                }}
              >
                회원가입
              </SignUpButton>
            </HomeBox>
          </>
        )}
      </MainBox>
      <Footer />
    </>
  );
};

export default Main;
