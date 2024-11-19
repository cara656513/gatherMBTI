import { Header } from "../components/Header";
import Footer from "../components/Footer";

import { useState } from "react";
import supabase from "../supabase";
import { useNavigate } from "react-router-dom";
import { uploadFile } from "../api/storage";
import styled from "styled-components";

const InputForm = styled.form`
  display: grid;
  place-items: center;
`;
const InputWrapper = styled.div`
  padding: 100px 0 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Input = styled.input`
  width: 400px;
  height: 400px;
  border: 1px solid #d8d8d8;
  border-radius: 10px;
  margin: 5px;
  padding: 20px;
`;
const Button = styled.button`
  border: 1px solid black;
  border-radius: 50px;
  background-color: orange;
  padding: 10px;
  width: 100px;
`;
const Label = styled.label`
  width: 400px;
  height: 400px;
  border: 1px solid #d8d8d8;
  border-radius: 10px;
  margin: 5px;
  padding: 20px;
  background-color: #f2f2f2;
  color: #bdbdbd;
  font-size: 50px;
  text-align: center;
  display: grid;
  place-items: center;
`;
const NewPost = () => {
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
      const url = await uploadFile(input);

      const { data, error } = await supabase.from("posts").insert({
        user_id: "bfc6916c-70ca-4def-890a-e99ecbc57ee3",
        picture: url,
        content: input.text,
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
