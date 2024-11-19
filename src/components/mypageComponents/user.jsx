import { useEffect, useState } from "react";
import supabase from "../../supabase";
import { ProfileImg, UserHiWrapper } from "../../styles/MyPageStyles";

export const UserFetchData = () => {
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

      //모든 유저 데이터 가져오기
      const { data, error } = await supabase.from("users").select("*");
      if (error) {
        console.log(error);
        return;
      }
      setDatas(data);
    };

    fetchData();
  }, []);

  return (
    <>
      {datas
        .filter((data) => data.id === userid)
        .map((data) => {
          return (
            <UserHiWrapper key={data.id}>
              <ProfileImg
                src={
                  data.profile_img
                    ? data.profile_img
                    : `src/images/empty_profile.jpg`
                }
              ></ProfileImg>
              <div>안녕하세요, {data.name}님!</div>
            </UserHiWrapper>
          );
        })}
    </>
  );
};
