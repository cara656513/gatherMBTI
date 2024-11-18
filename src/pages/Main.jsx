import { useEffect, useState } from "react";
import supabase from "../supabase";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const MainBox = styled.div`
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const MainCategory = styled.div`
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 401px;
  height: 174px;
  margin: 49px 760px 91px 759px;
`;

const MainCategoryMbti = styled.p`
  @font-face {
    font-family: "KBO-Dia-Gothic_bold";
    src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-2@1.0/KBO-Dia-Gothic_bold.woff")
      format("woff");
    font-weight: 700;
    font-style: normal;
  }

  font-family: "KBO-Dia-Gothic_bold", sans-serif;
  font-size: 60px;
  text-align: center;
  

  & span {
    font-weight: 300;
    font-size: 16px;
  }
`;

const MainCategoryHashtag = styled.p`
  @font-face {
    font-family: "KBO-Dia-Gothic_bold";
    src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-2@1.0/KBO-Dia-Gothic_bold.woff")
      format("woff");
    font-weight: 300;
    font-style: normal;
  }

  font-family: "KBO-Dia-Gothic_bold", sans-serif;
  font-size: 16px;
  text-align: center;
  `

const PostboxWrapper = styled.div`
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 22px 23.83px;
  flex-wrap: wrap;
  width: 1338px;
  height: 732.17px;
  margin: 0px 291px 0px 291px;

  @media (max-width: 1400px) {
    width: 100%;
    margin: 0;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
  }
`;

const Postbox = styled.div`
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 20px;
  box-shadow: 0px 0px 9.7px rgba(0, 0, 0, 0.1);
  width: 250px;
  height: 354.17px;
`;

const PostboxImage = styled.img`
  width: 222.22px;
  height: 222.22px;
  border-radius: 20px;
  margin: 13.19px 13.89px 12px 13.89px;
`;

const PostboxContent = styled.button`
  background-color: #ffffff;
  width: 222px;
  height: 43px;
  margin: 0px 14px 0px 14px;
  border: transparent;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  cursor: pointer;
`;

const Userbox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  width: 218.75px;
  height: 29.19px;
  margin: 21.39px 14.58px 16.67px 13.17px;
`;

const UserboxImage = styled.img`
  background-color: orange;
  width: 27.78px;
  height: 27.78px;
  border-radius: 50%;
`;

const UserboxId = styled.p`
  width: 129px;
  height: 24px;
  margin: 5.19px 26.64px 0px 7.56px;
`;

const LikeButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fe8125;
  width: 27.78px;
  height: 27.78px;
  border-radius: 50%;
  border: transparent;
`;
const LikeButtonImage = styled.img`
  width: 15.28px;
  height: 13.37px;
  width: 15.28px;
  height: 13.37px;
  filter: brightness(0) invert(1);
`;

const Main = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: postData, error: postError } = await supabase
        .from("posts")
        .select("*")
        .order("id", { ascending: false });

      if (postError) {
        console.error("게시글 데이터 가져오기 오류: ", postError);
      } else {
        setPosts(postData);
      }

      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("*");

      if (userError) {
        console.error("사용자 데이터 가져오기 오류: ", userError);
      } else {
        setUsers(userData);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <MainBox>
        <MainCategory>
          <MainCategoryMbti>
            INFP
            <br />
            <span>겉은 평온, 속은 드라마 한 시즌 완결 중인 감성 폭발 공상러!</span>
            <MainCategoryHashtag>#이해심</MainCategoryHashtag>
          </MainCategoryMbti>
        </MainCategory>
        <PostboxWrapper>
          {posts.map((post) => {
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
      </MainBox>
    </>
  );
};

export default Main;
