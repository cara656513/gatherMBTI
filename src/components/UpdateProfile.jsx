import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BasicImage, BasicStyle, Container, ImageInfor, InputStyle, IntroduceStyle, LabelStyle, SelectStyle, UpdateButton, UpdateImage } from "../styles/UpdateProfileStyle";
import supabase from "../supabase";
import { Header } from "./Header";


const mbtiOptions = [
  "ISTJ",
  "ISFJ",
  "INFJ",
  "INTJ",
  "ISTP",
  "ISFP",
  "INFP",
  "INTP",
  "ESTP",
  "ESFP",
  "ENFP",
  "ENTP",
  "ESTJ",
  "ESFJ",
  "ENFJ",
  "ENTJ",
];

const UpdateProfile = () => {
  const navigate = useNavigate();
  const [editImage, setEditImage] = useState(null);
  const [editName, setEditName] = useState("");
  const [editNickName, setEditNickName] = useState("");
  const [editMbti, setEditMbti] = useState("");
  const [editText, setEditText] = useState("");
  const [datas, setDatas] = useState([]);
  const [userid, setUserid] = useState("");
  const [isImageChanged, setIsImageChanged] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data: userData, error: userError } = await supabase.auth.getUser();

      if (userError || !userData.user) {
        alert("로그인 해주세요!");
        navigate("/login");
        return;
      }
      setUserid(userData.user.id);

      const { data, error } = await supabase.from("users").select("*");
      if (error) {
        console.log(error);
        return;
      }
      setDatas(data);
    };

    fetchData();
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    const { data: updateData } = await supabase.storage
      .from("profile_img")
      .upload(`profiles_${Date.now()}.png`, editImage);
    
    const { data: urlData } = supabase.storage
      .from("profile_img")
      .getPublicUrl(updateData.path);

    const { error } = await supabase
      .from("users")
      .update({
        name: editName || datas.find(data => data.id === userid)?.name,
        nickname: editNickName || datas.find(data => data.id === userid)?.nickname,
        mbti: editMbti || datas.find(data => data.id === userid)?.mbti,
        profile_text: editText || datas.find(data => data.id === userid)?.profile_text,
        profile_img: urlData.publicUrl || datas.find(data => data.id === userid)?.profile_img,
      })
      .eq("id", userid);

    alert("프로필이 수정되었습니다!");
    navigate(`/mypage`);
  }

    const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditImage(file);
      setIsImageChanged(true);
    } else {
      setIsImageChanged(false);
    }
  };

  return (
    <>
      <Header
        menus={[
          { route: "/newpost", menu: "글쓰기" },
          { route: "/mypage", menu: "마이페이지" },
          { menu: "로그아웃", type: "button" },
        ]}
      />
    <Container>
      {datas
        .filter((data) => data.id === userid)
        .map((data) => {
          return (
            <ImageInfor key={data.id}>
              <BasicImage src={data.profile_img} alt="Profile_Image"/>
              {isImageChanged ? <p>{data.name}님 프로필 사진이 변경되었습니다!</p> : <p>{data.name}</p>}
              <br/>
              <div>
                <UpdateImage>
                프로필 사진 변경
                  <input
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                  />
                </UpdateImage>
              </div>
              <BasicStyle>
                <LabelStyle>
                  이름
                  <InputStyle
                    type="text"
                    value={editName || data.name}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                </LabelStyle>
                <LabelStyle>
                  닉네임
                  <InputStyle
                    type="text"
                    value={editNickName || data.nickname}
                    onChange={(e) => setEditNickName(e.target.value)}
                  />
                </LabelStyle>
                <LabelStyle>
                  mbti
                  <SelectStyle
                    value={editMbti || data.mbti}
                    onChange={(e) => setEditMbti(e.target.value)}
                  >
                    <option value="">MBTI 선택</option>
                    {mbtiOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </SelectStyle>
                  </LabelStyle>
                <label>
                  자기소개
                  <IntroduceStyle
                    type="text"
                    value={editText || data.profile_text}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                </label>
              </BasicStyle>
              <UpdateButton type="button" onClick={handleUpdateProfile}>
                수정하기
              </UpdateButton>
            </ImageInfor>
          );
        })}
    </Container>
    </>
  );
};

export default UpdateProfile;
