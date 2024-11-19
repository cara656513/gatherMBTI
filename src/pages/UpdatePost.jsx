import { Header } from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import supabase from "../supabase";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { uploadFile } from "../api/storage";

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
const UpdatePost = () => {
  const [userid, setUserid] = useState();
  const [input, setInput] = useState({ img: null, text: "" });
  const navigate = useNavigate();
  const { id } = useParams();

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
