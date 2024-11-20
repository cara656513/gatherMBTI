import styled from "styled-components";

export const Wrapper = styled.div`
  /* display: grid; */
  place-items: center;
  padding: 40px;
  margin: 50px 0 0 0;
`;

export const ImgBox = styled.img`
  height: 300px;
  width: 300px;
  border: 1px solid black;
  margin: 3px;
`;

export const ImgWrapper = styled.div`
  width: 1000px;
  display: flex;
  flex-wrap: wrap;
`;

export const ProfileImg = styled.img`
  height: 100px;
  width: 100px;
  border-radius: 50px;
  margin: 20px;
`;

export const UserHiWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 50px;
`;

export const ButtonWrapper = styled.div`
  display: flex;

  button {
    background-color: orange;
    border: 1px solid black;
    margin: 3px;
    padding: 5px;
    width: 50px;
    border-radius: 30px;
  }
`;

export const SelfIntro = styled.div`
  width: 500px;
  * {
    margin: 10px;
  }
  input {
    width: 350px;
    height: 20px;
    word-wrap: break-word;
    border-radius: 10px;
  }
  h1 {
    font-size: 30px;
  }
  button {
    background-color: orange;
    border: 1px solid black;
    margin: 3px;
    padding: 5px;
    width: 100px;
    border-radius: 30px;
  }
  p {
    display: -webkit-box;
    word-wrap: break-word;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
