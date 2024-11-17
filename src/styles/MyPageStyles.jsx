import styled from "styled-components";

export const Wrapper = styled.div`
  display: grid;
  place-items: center;
  padding: 50px;
  margin: 100px 0 0 0;
`;

export const HeaderWrapper = styled.div`
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px 0 20px;
  border-bottom: 1px solid black;
  position: fixed;
  top: 0;
  width: 100%;
  background-color: white;
`;

export const MenuWrapper = styled.div`
  a {
    padding: 0 30px 0 0;
  }
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

export const Title = styled.div`
  font-size: 50px;
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