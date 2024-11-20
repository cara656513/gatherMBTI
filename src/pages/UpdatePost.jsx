import { Header } from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
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
  const [previewImg, setPreviewImg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const handleBringValue = async (id) => {
      let { data: post, error } = await supabase
        .from("posts")
        .select("*")
        .eq("id", id);
      if (error) {
        console.log(error);
      }

      setInput((prev) => ({
        ...prev,
        text: post[0].content,
      }));

      setPreviewImg(post[0].picture);
    };
    handleBringValue(id);
  }, [id]);

  const handleImgInputChange = (e) => {
    const { files } = e.target;
    setInput((prev) => ({ ...prev, img: files[0] }));
    const objectUrl = URL.createObjectURL(files[0]);
    setPreviewImg(objectUrl);
  };

  const handleTxtInputChange = (e) => {
    const { id, value } = e.target;
    setInput((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmitPost = async (e) => {
    e.preventDefault();

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
            placeholder="수정할 내용을 입력해주세요."
            value={input.text}
          />
        </InputWrapper>
        <Button type="submit">수정하기</Button>
      </InputForm>
      <Footer />
    </div>
  );
};

export default UpdatePost;
