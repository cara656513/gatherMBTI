import { useContext, useState } from "react";
import supabase from "../../supabase";
import {
  ProfileImg,
  UserHiWrapper,
  SelfIntro,
  SelfImg,
  ProfileImgLabel,
  StyledLink,
} from "../../styles/MyPageStyles";
import { Link } from "react-router-dom";
import { uploadFile } from "../../api/storage";
import { UserContext } from "../../context/userContext";

const UserFetchData = () => {
  const { user, setUser } = useContext(UserContext);
  const [txtInput, setTxtInput] = useState();
  const [imgInput, setImgInput] = useState(null);

  //자기소개 수정
  const handleUpdateIntro = async () => {
    if (!txtInput) {
      alert("수정 내용을 입력해주세요!");
    } else {
      const { data, error } = await supabase
        .from("users")
        .update({ profile_text: txtInput })
        .eq("id", user.id)
        .select();
      if (error) throw error;
      setUser(data[0]);
      alert("자기소개가 수정되었습니다!");
      setTxtInput("");
    }
  };

  const handleTxtInputChange = (e) => {
    setTxtInput(e.target.value);
  };

  const handleImgInputChange = async (e) => {
    const { files } = e.target;
    setImgInput(files[0]);
  };

  const handleChangeImg = async () => {
    const updatingObj = {};
    const url = await uploadFile({ img: imgInput });

    updatingObj.profile_img = url;

    const { data, error } = await supabase
      .from("users")
      .update(updatingObj)
      .eq("id", `${user.id}`)
      .select();

    alert("프로필 사진이 수정되었습니다!");
  };

  return (
    <>
      <UserHiWrapper key={user?.id}>
        <SelfImg>
          <ProfileImg
            src={
              user?.profile_img
                ? user.profile_img
                : `https://dpsocvfllvgybxswytnl.supabase.co/storage/v1/object/public/profile_img/default-profile.jpg`
            }
          ></ProfileImg>
          <ProfileImgLabel>
            프로필 이미지 변경
            <input
              type="file"
              accept="image/*"
              style={{
                display: "none",
              }}
              onChange={handleImgInputChange}
              id="img"
            />
          </ProfileImgLabel>
          <button onClick={handleChangeImg}>확인</button>
        </SelfImg>
        <SelfIntro>
          <h1>안녕하세요, {user?.name}님!</h1>
          <input
            type="text"
            placeholder="자기소개를 입력해주세요."
            onChange={handleTxtInputChange}
            value={txtInput}
          />
          <button onClick={handleUpdateIntro}>자기소개 수정</button>
          <p>{user?.profile_text}</p>
        </SelfIntro>
        <StyledLink>
          <Link to="/member">회원 정보 수정</Link>
        </StyledLink>
      </UserHiWrapper>
    </>
  );
};

export default UserFetchData;
