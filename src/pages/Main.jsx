import { useEffect } from "react";
import supabase from "../supabase";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const PostboxWrapper = styled.div`
  background-color: #ffe4b8;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 5%;
  padding: 10px;
`;

const Postbox = styled.div`
  background-color: yellow;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0;
`;

const PostboxImage = styled.img`
  background-color: grey;
  width: 500px;
  height: 300px;
`;

const PostboxTitle = styled.button`
  background-color: orange;
`;

const Main = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("posts").select("*");

      if (error) {
        console.error("데이터 가져오기 오류:", error);
      }
      console.log("Supabase 데이터:", data);
    };

    fetchData();
  }, []);

  return (
    <>
      <PostboxWrapper>
        <Postbox>
          <PostboxImage />
          <PostboxTitle
            onClick={() => {
              navigate(`/detail`);
            }}
          >
            포스트 제목
          </PostboxTitle>
        </Postbox>
      </PostboxWrapper>
    </>
  );
};

export default Main;
