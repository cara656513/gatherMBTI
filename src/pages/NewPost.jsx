import { Header } from "../components/Header";
import Footer from "../components/Footer";
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
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value, files } = e.target;
    if (id === "img") {
      setInput((prev) => ({ ...prev, img: files[0] }));
    } else {
      setInput((prev) => ({ ...prev, [id]: value }));
    }
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

  return (
    <div>
      <Header
        menus={[
          { route: "/newpost", menu: "글쓰기" },
          { route: "/mypage", menu: "마이 페이지" },
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
            +
            <input
              type="file"
              accept="image/*"
              id="img"
              onChange={handleInputChange}
              style={{
                display: "none",
              }}
            />
          </Label>
          <Input
            type="text"
            id="text"
            onChange={handleInputChange}
            placeholder="오늘은 무슨 생각 하셨나요?"
          />
        </InputWrapper>
        <Button type="submit">올리기</Button>
      </InputForm>
      <Footer />
    </div>
  );
};

export default NewPost;
