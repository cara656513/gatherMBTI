import { useEffect, useState } from "react";
import supabase from "../../supabase";
import { ImgBox, ImgWrapper } from "../../styles/MyPageStyles";
import { Link } from "react-router-dom";

export const PostFetchData = () => {
  const [datas, setDatas] = useState([]);
  const [userid, setUserid] = useState();

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

  // const handleUpdatePost = async (e) => {
  //   console.log(e.target.id);

  //   const { data, error } = await supabase
  //     .from("posts")
  //     .update({ other_column: "otherValue" })
  //     .eq("some_column", "someValue")
  //     .select();
  // };

  return (
    <ImgWrapper>
      {datas
        .filter((data) => data.user_id === userid)
        .map((data) => {
          return (
            <>
              <Link key={data.id} to="/detail">
                <ImgBox src={data.picture} />
              </Link>
              <button id={data.id}>수정</button>
              <button>삭제</button>
            </>
          );
        })}
    </ImgWrapper>
  );
};
