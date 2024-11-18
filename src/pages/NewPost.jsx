import { Wrapper } from "../styles/MyPageStyles";
import { Header } from "../components/Header";
import { useState } from "react";
import supabase from "../supabase";

const NewPost = () => {
  const [input, setInput] = useState();

  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.id]: e.target.value });
  };

  const handleSubmitPost = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.from("posts").insert({
      user_id: "bfc6916c-70ca-4def-890a-e99ecbc57ee3",
      picture: input.img,
      content: input.text,
    });
    if (error) {
      console.log(error);
    } else {
      alert("글이 등록되었습니다!");
      console.log(data);
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
      <Wrapper>
        <input
          type="file"
          accept="image/*"
          id="img"
          // value={input.img || ""}
          onChange={handleInputChange}
        />
        <input
          type="text"
          id="text"
          // value={input.text || ""}
          onChange={handleInputChange}
          placeholder="오늘은 무슨 생각 하셨나요?"
        />
        <button onClick={handleSubmitPost}>올리기</button>
      </Wrapper>
    </div>
  );
};

export default NewPost;
