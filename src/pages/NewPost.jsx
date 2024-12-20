import { Header } from "../components/Header";
import { useEffect, useState } from "react";
import supabase from "../supabase";
import { useNavigate } from "react-router-dom";
import { uploadFile } from "../api/storage";
import {
  Button,
  Input,
  InputForm,
  InputWrapper,
  Label,
} from "../styles/PostInputStyles";

const NewPost = () => {
  const [userid, setUserid] = useState();
  const [input, setInput] = useState({ img: null, text: "" });
  const [previewImg, setPreviewImg] = useState("");
  const navigate = useNavigate();

  const handleImgInputChange = (e) => {
    const { files } = e.target;
    setInput((prev) => ({ ...prev, img: files[0] }));

    // encodeFileToBase64(files[0]);

    const objectUrl = URL.createObjectURL(files[0]);
    setPreviewImg(objectUrl);
  };

  const handleTxtInputChange = (e) => {
    const { id, value } = e.target;

    setInput((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmitPost = async (e) => {
    e.preventDefault();

    if (!input.text) {
      alert("내용은 꼭 입력해주세요!");
      return;
    }

    try {
      const updatingObj = {};

      if (input.img) {
        const url = await uploadFile(input);
        updatingObj.picture = url;
      } else {
        updatingObj.picture = null;
      }
      updatingObj.content = input.text;

      const { data, error } = await supabase.from("posts").insert({
        user_id: userid,
        ...updatingObj,
      });

      if (error) throw error;

      alert("글이 등록되었습니다!");
      navigate("/");
      console.log("Post data:", data);

      setInput({ img: null, text: "" });
    } catch (error) {
      console.error("Error submitting post:", error.message);
    }
  };

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
    };

    fetchData();
  }, []);

  // const encodeFileToBase64 = (fileBlob) => {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(fileBlob);
  //   reader.onload = () => {
  //     setPreviewImg(reader.result);
  //   };
  // };

  return (
    <div>
      <Header
        menus={[
          { route: "/mypage", menu: "마이 페이지", type: "link" },
          { menu: "로그아웃", type: "button" },
        ]}
      />

      <InputForm
        onSubmit={handleSubmitPost}
        style={{
          minHeight: "100vh",
        }}
      >
        <InputWrapper>
          <Label>
            {previewImg ? (
              <img
                style={{
                  width: "100%",
                }}
                src={previewImg}
              />
            ) : (
              "+"
            )}
            <input
              type="file"
              accept="image/*"
              id="img"
              onChange={handleImgInputChange}
              style={{
                display: "none",
              }}
            />
          </Label>
          <Input
            type="text"
            id="text"
            onChange={handleTxtInputChange}
            placeholder="오늘은 무슨 생각 하셨나요?"
          />
        </InputWrapper>
        <Button type="submit">올리기</Button>
      </InputForm>
    </div>
  );
};

export default NewPost;
