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
  width: 600px;
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
  width: 526px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  padding: 37px;
`;

export const UserImg = styled.div`
  width: 52px;
  height: 52px;
  overflow: hidden;
  position: relative;
  border-radius: 50%;
  flex-shrink: 0;

  img {
    width: 100%;
  }
`;

export const UserEditImg = styled.div`
  width: 52px;
  height: 52px;
  overflow: hidden;
  position: relative;
  border-radius: 50%;
  flex-shrink: 0;

  img {
    width: 100%;
  }
`;

export const Nickname = styled.div`
  font-weight: bold;
  flex: 1;
  margin-left: 10px;
  font-size: 18px;
`;

export const CommentNickname = styled.div`
  font-weight: bold;
  margin-left: 10px;
  font-size: 18px;
`;

export const Comment = styled.div`
  font-size: 18px;
  margin-left: 17px;
`;

export const MenuDots = styled.div`
  width: 16px;
  height: 16px;
  margin-left: auto;
  margin-right: 27px;

  svg {
    width: 100%;
    height: 100%;
    fill: #000;
  }

  button {
    background-color: none;
  }
`;

export const CommentMenuDots = styled.button`
  width: 16px;
  height: 16 px;
  background: none; /* 기본 배경 제거 */
  border: none;
  padding: 0;
  cursor: pointer;

  svg {
    width: 100%;
    height: 100%;
    fill: #000;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;

export const ContentText = styled.div`
  font-size: 18px;
  margin-top: 10px;
  font: unset;
`;

export const CommentInputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const CommentInput = styled.input`
  width: 100%;
  border: 1px solid #d9d9d9;
  line-height: 52px;
  border-radius: 15px;
  font-size: 18px;
  padding: 0px 0px 0px 17px;
  box-sizing: border-box;
`;

export const CommentEditInput = styled.input`
  width: 100%;
  border: 1px solid #d9d9d9;
  line-height: 52px;
  border-radius: 15px;
  font-size: 18px;
  padding: 0px 17px;
  box-sizing: border-box;
`;

export const CommentButton = styled.button`
  width: 36px;
  height: 36px;
  position: absolute;
  top: 50%;
  right: 17px;
  transform: translateY(-50%);
  border: none;
  background-color: #fe8125;
  color: white;
  border-radius: 50%;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #ff9b42;
  }

  svg {
    width: 16px;
    height: 16px;
    fill: #000;
  }
`;

export const CommentEditButton = styled.button`
  height: 36px;
  position: absolute;
  top: 50%;
  right: 17px;
  transform: translateY(-50%);
  border: none;
  background-color: #d9d9d9;
  color: #000;
  border-radius: 10px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;

  &:hover {
    background-color: #efefef;
  }
`;

export const CommentUserInfo = styled.div`
  display: flex;
  align-items: center; /* 수직 가운데 정렬 */
  width: 100%;
  top: 0px;
  gap: 17px;
`;

export const UpComment = styled.div`
  display: flex;
  align-items: center; /* 수직 가운데 정렬 */
  position: relative;
  gap: 17px;
`;
export const CommentList = styled.div`
  display: flex;
  flex-direction: column; /* 댓글을 위에서 아래로 쌓기 */
  gap: 10px; /* 댓글 간 간격 */
  width: 100%;
  margin-top: auto; /* 위 요소와의 공간 자동 분배 */
  overflow: auto; /* 댓글이 많아지면 스크롤 가능 */
  max-height: 300px; /* 필요한 경우 최대 높이 설정 */
`;

export const ModalMenu = styled.div`
  position: relative;
  top: 0px; /* 버튼 아래에 위치하도록 조정 */
  right: 0px;
  background: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  z-index: 1000;
  display: flex;
  flex-direction: column;

  button {
    padding: 10px 15px;
    border: none;
    background: none;
    cursor: pointer;
    text-align: left;

    &:hover {
      background: #f1f1f1;
    }
  }
`;
