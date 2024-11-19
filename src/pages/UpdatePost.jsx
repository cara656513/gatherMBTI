import { Header } from "../components/Header";
import Footer from "../components/Footer";
import { useState } from "react";
import supabase from "../supabase";
import { useNavigate, useParams } from "react-router-dom";
import { uploadFile } from "../api/storage";
import {
  Button,
  Input,
  InputForm,
  InputWrapper,
  Label,
} from "../styles/PostInputStyles";

const UpdatePost = () => {
  const [input, setInput] = useState({ img: null, text: "" });
  const navigate = useNavigate();
  const { id } = useParams();

  console.log(id);
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

    if (!input.text && !input.img) {
      alert("수정 사항이 없습니다.");
      return;
    }

    try {
      const updatingObj = {};

      if (input.img) {
        const url = await uploadFile(input);
        updatingObj.picture = url;
      }
      updatingObj.content = input.text;

      const { data, error } = await supabase
        .from("posts")
        .update(updatingObj)
        .eq("id", `${id}`)
        .select();

      if (error) throw error;

      alert("글이 수정되었습니다!");
      navigate("/");
      console.log("Post data:", data);

      setInput({ img: null, text: "" });
    } catch (error) {
      console.error("Error submitting post:", error.message);
    }
  };

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
            placeholder="수정할 내용을 입력해주세요."
          />
        </InputWrapper>
        <Button type="submit">수정하기</Button>
      </InputForm>
      <Footer />
    </div>
  );
};

export default UpdatePost;
