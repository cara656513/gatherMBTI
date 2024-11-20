import { useEffect, useState } from "react";
import supabase from "../../supabase";
import {
  ProfileImg,
  UserHiWrapper,
  SelfIntro,
} from "../../styles/MyPageStyles";

export const UserFetchData = () => {
  const [data, setData] = useState();
  const [userid, setUserid] = useState();
  const [txtInput, setTxtInput] = useState();

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

      //유저 데이터 가져오기
      let { data: user, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", userData.user.id);

      if (error) {
        console.log(error);
        return;
      }
      setData(user[0]);
    };

    fetchData();
  }, []);

  //자기소개 수정
  const handleUpdateIntro = async () => {
    const { data, error } = await supabase
      .from("users")
      .update({ profile_text: txtInput })
      .eq("id", userid)
      .select();

    if (error) throw error;
    alert("자기소개가 수정되었습니다!");

    setTxtInput("");

    setData(data[0]);
  };

  const handleTxtInputChange = (e) => {
    setTxtInput(e.target.value);
  };

  return (
    <>
      <UserHiWrapper key={data?.id}>
        <ProfileImg
          src={
            data?.profile_img
              ? data.profile_img
              : `https://dpsocvfllvgybxswytnl.supabase.co/storage/v1/object/public/profile_img/default-profile.jpg`
          }
        ></ProfileImg>
        <SelfIntro>
          <h1>안녕하세요, {data?.name}님!</h1>
          <input
            type="text"
            placeholder="자기소개를 입력해주세요."
            onChange={handleTxtInputChange}
            value={txtInput}
          />
          <button onClick={handleUpdateIntro}>자기소개 수정</button>
          <p>{data?.profile_text}</p>
        </SelfIntro>
      </UserHiWrapper>
    </>
  );
};
