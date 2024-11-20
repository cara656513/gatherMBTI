import { useEffect, useState } from "react";
import supabase from "../supabase";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import Footer from "../components/Footer";
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

const Main = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [userMbti, setUserMbti] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); // 로딩 상태

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // 로딩 시작
      try {
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

        // 로딩 종료
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredPosts = posts.filter((post) => {
    const user = users.find((user) => user.id === post.user_id);
    return user && user.mbti === userMbti;
  });

  // 로딩 중일 때 빈 화면  렌더링
  if (loading) {
    return null;
  }

  return (
    <>
      {currentUser ? (
        // 로그인 후 페이지
        <>
          <Header />
          <MainBox>
            {/* MBTI 박스 */}
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

            {/* 게시글 박스 */}
            <PostboxWrapper>
              {filteredPosts.map((post) => {
                const user = users.find((user) => user.id === post.user_id);

                return (
                  <Postbox
                    key={post.id}
                    onClick={() => {
                      navigate(`/detail/${post.id}`);
                    }}
                  >
                    {/* 게시글 */}
                    <PostboxImage
                      src={post.picture || "src/images/Default_Image.jpg"}
                      alt="Post image"
                    />
                    <PostboxContent>{post.content}</PostboxContent>

                    {/* 게시글의 유저 프로필 */}
                    <Userbox key={user ? user.id : post.id}>
                      <UserboxImage
                        src={user?.profile_img || "src/images/profile_img.jpg"}
                        alt="Userbox image"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (user?.id === currentUser?.id) {
                            navigate("/mypage");
                          } else {
                            alert("자신의 마이페이지로만 이동 가능합니다.");
                          }
                        }}
                      />
                      <UserboxId
                        onClick={(e) => {
                          e.stopPropagation();
                          if (user?.id === currentUser?.id) {
                            navigate("/mypage");
                          } else {
                            alert("자신의 마이페이지로만 이동 가능합니다.");
                          }
                        }}
                      >
                        {user ? user.nickname : "Unknown User"}
                      </UserboxId>
                    </Userbox>
                  </Postbox>
                );
              })}
            </PostboxWrapper>
          </MainBox>
        </>
      ) : (
        // 로그인 전 페이지
        <>
          <Header
            menus={[
              { route: "/login", menu: "로그인" },
              { route: "/signup", menu: "회원가입" },
            ]}
          />
          <MainBox>
            <HomeBox>
              <HomeLogo src="/images/logo2.svg" />
              <HomeLogoText>
                같은 <span>MBTI</span>끼리
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
          </MainBox>
        </>
      )}
    </>
  );
};

export default Main;
