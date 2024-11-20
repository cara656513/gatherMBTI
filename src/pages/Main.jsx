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
import { useUserPost } from "../components/mainComponents/useUserPost";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const { posts, users, userMbti, currentUser } = useUserPost();

  const filteredPosts = posts?.filter((post) => {
    const user = users.find((user) => user.id === post.user_id);
    return user && user.mbti === userMbti;
  });

  const navigate = useNavigate();
  return (
    <>
      {currentUser ? (
        // 로그인 후 페이지
        <>
          <Header />
          <MainBox>
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
              {filteredPosts?.map((post) => {
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
              <HomeLogo src="src\images\logo2.svg" />
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