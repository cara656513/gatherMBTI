import { useEffect, useState } from "react";
import supabase from "../../supabase";
import { ButtonWrapper, ImgWrapper } from "../../styles/MyPageStyles";
import { Link, useNavigate } from "react-router-dom";
import { Postbox, PostboxImage, PostboxContent } from "/src/styles/MainStyles";
import { PostboxWrapper } from "../../styles/MainStyles";

export const PostFetchData = () => {
  const [datas, setDatas] = useState([]);
  const [userid, setUserid] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      //로그인한 사람 데이터 찾기
      const { data: userData, error: userError } =
        await supabase.auth.getUser();
      if (userError) {
        console.error("Error fetching user:", userError);
        return;
      }
      setUserid(userData.user.id);

      //모든 포스트 데이터 가져오기
      const { data, error } = await supabase.from("posts").select("*");
      if (error) {
        console.log(error);
        return;
      }
      setDatas(data);
    };

    fetchData();
  }, []);

  const handleUpdatePost = async (e) => {
    e.preventDefault();
    navigate(`/updatepost/${e.target.id}`);
  };

  const handleDeletePost = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from("posts")
      .delete()
      .eq("id", e.target.id);

    if (error) {
      console.log(error);
      return;
    }

    alert("글이 삭제되었습니다!");
    navigate(`/`);
  };

  return (
    <PostboxWrapper>
      {datas
        .filter((data) => data.user_id === userid)
        .map((data) => {
          return (
            <>
              <Link key={data.id} to={`/detail/${data.id}`}>
                <Postbox>
                  {data.picture !== null ? (
                    <>
                      <PostboxImage src={data.picture} alt="Post image" />
                      <PostboxContent>{data.content}</PostboxContent>
                    </>
                  ) : (
                    <PostboxContent>{data.content}</PostboxContent>
                  )}
                  <ButtonWrapper>
                    <button id={data.id} onClick={handleUpdatePost}>
                      수정
                    </button>
                    <button id={data.id} onClick={handleDeletePost}>
                      삭제
                    </button>
                  </ButtonWrapper>
                </Postbox>
              </Link>
            </>
          );
        })}
    </PostboxWrapper>
  );
};
