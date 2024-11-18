import { useEffect, useState } from "react";
import supabase from "../supabase";
import styled from "styled-components";
import { Link } from "react-router-dom";

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
  margin: 10px;
`;

const PostboxImage = styled.img`
  background-color: grey;
  width: 500px;
  height: auto;
  min-height: 200px;
  margin: 10px;
`;

const PostboxTitle = styled.button`
  background-color: orange;
  margin: 10px;
`;

const Main = () => {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("posts").select("*").order("id", { ascending: false });

      if (error) {
        console.error("데이터 가져오기 오류:", error);
      }
      setPosts(data);    
    };
    fetchData();
  }, []);

  return (
    <>
      <PostboxWrapper>
      {posts.map((post) => (
      <Link key={post.id} to={`/detail/${post.id}`}>
        <Postbox>
        <PostboxImage src={post.picture} alt="Post image" />
        <PostboxTitle>
          {post.title}
        </PostboxTitle>
        </Postbox>
      </Link>
        ))}
      </PostboxWrapper>
    </>
  );
};

export default Main;
