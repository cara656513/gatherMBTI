import styled from "styled-components";

export const Content = styled.div`
  width: 1200px;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  box-shadow: 0 0 10px rgba(0, 0, 9.7, 0.1);
  border-radius: 20px;
`;

export const Left = styled.div`
  width: 50%;
  border-radius: 20px;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

export const HeartButton = styled.button`
  width: 46px;
  height: 46px;
  padding: 0;
  background-color: #fe8125;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  bottom: 10px;
  right: 10px;

  svg {
    width: 26px;
    height: 22px;
    fill: white;
  }
`;

export const Right = styled.div`
  width: 50%;
  display: flex;
  padding: 37px;
  flex-direction: column; /* 수직으로 정렬 */
  align-items: flex-start; /* 왼쪽 정렬 */
  gap: 10px; /* 자식 요소 간의 간격 설정 (UserInfo와 ContentText 사이) */
`;

export const UserImg = styled.div`
  width: 52px;
  height: 52px;
  overflow: hidden;
  position: relative;
  border-radius: 50%;

  img {
    width: 100%;
  }
`;

export const Nickname = styled.div`
  font-weight: bold;
  flex: 1; /* 가로 공간을 유연하게 사용 */
  margin-left: 10px; /* UserImg와 Nickname 간격 */
  font-size: 18px; /* 원하는 텍스트 크기 */
`;

export const CommentNickname = styled.div`
  font-weight: bold;
  margin-left: 10px; /* UserImg와 Nickname 간격 */
  font-size: 18px; /* 원하는 텍스트 크기 */
`;

export const Comment = styled.div`
  font-size: 18px;
  margin-left: 27px;
`;

export const MenuDots = styled.div`
  width: 24px; /* 아이콘 크기 */
  height: 24px;
  margin-left: auto; /* 오른쪽 끝으로 밀어냄 */

  svg {
    width: 100%;
    height: 100%;
    fill: #000; /* 아이콘 색상 */
  }
`;

export const UserInfo = styled.div`
  display: flex; /* Flexbox로 수평 정렬 */
  align-items: center; /* 세로 정렬: 중앙 정렬 */
  justify-content: flex-start; /* 자식 요소를 왼쪽 정렬 */
  width: 100%; /* 부모 요소의 너비에 맞춤 */
`;

export const ContentText = styled.div`
  font-size: 18px;
  margin-top: 10px;
`;

export const CommentInputWrapper = styled.div`
  position: relative;
  width: 80%;
`;

export const CommentInput = styled.input`
  width: 100%;
  border: 1px solid #d9d9d9;
  line-height: 52px;
  border-radius: 15px;
  font-size: 18px;
  padding: 0px 60px 0px 17px;
  box-sizing: border-box;
  margin-left: 17px;
`;

export const CommentButton = styled.button`
  width: 34px;
  height: 34px;
  position: absolute;
  top: 50%;
  right: 0px;
  transform: translateY(-50%);
  border: none;
  background-color: #fe8125;
  color: white;
  padding: 0 12px;
  height: 36px;
  border-radius: 50%;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #ff9b42;
  }

  svg {
    width: 16px;
    fill: #000;
  }
`;
