import { useEffect, useState } from "react";
import supabase from "../supabase";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
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
  LikeButton,
  LikeButtonImage,
} from "../styles/MainStyles";

const Main = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [userMbti, setUserMbti] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) {
        console.error("Error fetching user:", userError);
        return;
      }
      setCurrentUser(userData.user);

      const { data: allUsers, error: usersError } = await supabase.from("users").select("*");
      if (usersError) {
        console.error("Error fetching users:", usersError);
        return;
      }
      setUsers(allUsers);

      if (userData?.user) {
        const loggedInUser = allUsers.find((user) => user.id === userData.user.id);
        if (loggedInUser) {
          setUserMbti(loggedInUser.mbti);
        }
      }

      const { data: postData, error: postsError } = await supabase
        .from("posts")
        .select("*")
        .order("id", { ascending: false });
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

  const Logout = async() => {
    const { data, error } = await supabase.auth.signOut();
    console.log("signout: ", { data, error }); // data는 딱히 필요없을 듯
    navigate  = ("/login")
  }

  return (
    <>
      <Header
        menus={[
          { route: "/newpost", menu: "글쓰기" },
          { route: "/mypage", menu: "마이 페이지" },
          { route: "/login", menu: "로그아웃" },
        ]
      }
      Logout ={Logout}
     />
      <MainBox>
      {currentUser ? (
          <>
        <MainCategory>
          <MainCategoryMbti>{userMbti}</MainCategoryMbti>
          <MainCategoryMbtiSub>
            겉은 평온, 속은 드라마 한 시즌 완결 중인 감성 폭발 공상러!
          </MainCategoryMbtiSub>
          <MainCategoryHashtag>#이해심</MainCategoryHashtag>
        </MainCategory>
        <PostboxWrapper>
          {filteredPosts.map((post) => {
            const user = users.find((user) => user.id === post.user_id);

            return (
              <Postbox key={post.id}>
                <PostboxImage src={post.picture} alt="Post image" />
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
                      user?.profile_img ||
                      "https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f92b.svg"
                    }
                    alt="Userbox image"
                  />
                  <UserboxId>{user ? user.nickname : "Unknown User"}</UserboxId>
                  <LikeButton>
                    <LikeButtonImage src="src\images\heart.svg" />
                  </LikeButton>
                </Userbox>
              </Postbox>
            );
          })}
        </PostboxWrapper>
        </>
        ) : (
          <div>로그인 전 페이지</div>
        )}
      </MainBox>
    </>
  );
};

export default Main;
