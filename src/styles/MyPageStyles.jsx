import styled from "styled-components";

export const Wrapper = styled.div`
  display: grid;
  place-items: center;
  padding: 50px;
  margin: 100px 0 0 0;
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
  border: 1px solid black;
`;

export const UserHiWrapper = styled.div`
  display: flex;
  align-items: center;
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
