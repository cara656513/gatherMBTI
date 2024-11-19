import React, { useState } from "react";
import Modal from "../components/Modal"; // 모달 import
import {
  Content,
  Left,
  HeartButton,
  Right,
  UserImg,
  Nickname,
  MenuDots,
  UserInfo,
  ContentText,
  Comment,
  CommentInput,
  CommentInputWrapper,
  CommentButton,
  CommentUserInfo,
  UpComment,
  CommentList,
  CommentMenuDots,
  CommentEditButton,
  CommentEditInput,
  UserEditImg,
} from "../styles/DetailStyles";

const Detail = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [visibleMenuId, setVisibleMenuId] = useState(null); // 현재 열려있는 메뉴 ID
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리
  const [editCommentId, setEditCommentId] = useState(null); // 수정 중인 댓글 ID
  const [editContent, setEditContent] = useState(""); // 수정 중인 댓글 내용

  const toggleMenu = (id) => {
    setVisibleMenuId(visibleMenuId === id ? null : id);
    setIsModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setVisibleMenuId(null); // 메뉴 닫기
  };

  const handleAddComment = () => {
    if (newComment.trim() === "") return;

    const newCommentObj = {
      id: comments.length + 1,
      nickname: "유저닉네임",
      content: newComment,
    };

    setComments([...comments, newCommentObj]);
    setNewComment("");
  };

  const handleDeleteComment = (id) => {
    setComments(comments.filter((comment) => comment.id !== id));
    closeModal(); // 모달 닫기
  };

  const handleEditComment = (id, content) => {
    setEditCommentId(id);
    setEditContent(content);
    closeModal(); // 모달 닫기
  };

  const saveEditComment = () => {
    setComments(
      comments.map((comment) =>
        comment.id === editCommentId
          ? { ...comment, content: editContent }
          : comment
      )
    );
    setEditCommentId(null);
    setEditContent("");
  };

  return (
    <>
      <Content>
        <Left>
          <img src="src/images/IMG_4931.jpg" alt="" />
          {/* <HeartButton>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              id="Bold"
              viewBox="0 0 24 24"
            >
              <path d="M17.25,1.851A6.568,6.568,0,0,0,12,4.558,6.568,6.568,0,0,0,6.75,1.851,7.035,7.035,0,0,0,0,9.126c0,4.552,4.674,9.425,8.6,12.712a5.29,5.29,0,0,0,6.809,0c3.922-3.287,8.6-8.16,8.6-12.712A7.035,7.035,0,0,0,17.25,1.851ZM13.477,19.539a2.294,2.294,0,0,1-2.955,0C5.742,15.531,3,11.736,3,9.126A4.043,4.043,0,0,1,6.75,4.851,4.043,4.043,0,0,1,10.5,9.126a1.5,1.5,0,0,0,3,0,4.043,4.043,0,0,1,3.75-4.275A4.043,4.043,0,0,1,21,9.126C21,11.736,18.258,15.531,13.477,19.539Z" />
            </svg>
          </HeartButton> */}
        </Left>

        <Right>
          <UserInfo>
            <UserImg>
              <img src="src/images/IMG_1234.jpg" alt="" />
            </UserImg>
            <Nickname>유저닉네임</Nickname>
            <MenuDots onClick={() => toggleMenu(1)}>
              {" "}
              {/* ID를 전달 */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                id="Isolation_Mode"
                data-name="Isolation Mode"
                viewBox="0 0 24 24"
                width="512"
                height="512"
              >
                <circle cx="21.517" cy="12.066" r="2.5" />
                <circle cx="12" cy="12" r="2.5" />
                <circle cx="2.5" cy="12" r="2.5" />
              </svg>
            </MenuDots>
            {/* 조건부 렌더링 */}
            {visibleMenuId === 1 && (
              <Modal>
                <button onClick={() => alert("수정 클릭!")}>수정</button>
                <button onClick={() => alert("삭제 클릭!")}>삭제</button>
              </Modal>
            )}
          </UserInfo>

          <ContentText>
            아직 일요일인데 햄버거가 너무 먹고싶은데 어디껄 먹을지 고민이야..
          </ContentText>

          <CommentList>
            {comments.map((comment) => (
              <UpComment key={comment.id}>
                <UserEditImg>
                  <img src="src/images/IMG_1234.jpg" alt="" />
                </UserEditImg>

                {editCommentId === comment.id ? (
                  <CommentUserInfo>
                    <CommentInputWrapper>
                      <CommentEditInput
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        placeholder=""
                      />

                      <CommentEditButton onClick={saveEditComment}>
                        저장
                      </CommentEditButton>
                    </CommentInputWrapper>
                  </CommentUserInfo>
                ) : (
                  <>
                    <Comment>{comment.content}</Comment>
                    {/* MenuDots는 수정 중이 아닐 때만 렌더링 */}
                    <MenuDots>
                      <CommentMenuDots onClick={() => toggleMenu(comment.id)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          id="Isolation_Mode"
                          data-name="Isolation Mode"
                          viewBox="0 0 24 24"
                          width="512"
                          height="512"
                        >
                          <circle cx="21.517" cy="12.066" r="2.5" />
                          <circle cx="12" cy="12" r="2.5" />
                          <circle cx="2.5" cy="12" r="2.5" />
                        </svg>
                      </CommentMenuDots>
                      {visibleMenuId === comment.id && (
                        <Modal onClose={closeModal}>
                          <button
                            onClick={() =>
                              handleEditComment(comment.id, comment.content)
                            }
                          >
                            수정
                          </button>
                          <button
                            onClick={() => handleDeleteComment(comment.id)}
                          >
                            삭제
                          </button>
                        </Modal>
                      )}
                    </MenuDots>
                  </>
                )}
              </UpComment>
            ))}
          </CommentList>

          <CommentUserInfo>
            <UserImg>
              <img src="src/images/IMG_1234.jpg" alt="" />
            </UserImg>
            <CommentInputWrapper>
              <CommentInput
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="댓글을 입력하세요..."
              />
              <CommentButton onClick={handleAddComment}>
                <svg
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  viewBox="0 0 512 512"
                >
                  <path d="M256,476.5c-8.8,0-16.8-3.6-22.6-9.4-5.8-5.8-9.4-13.8-9.4-22.6V118.2s-126.4,126.4-126.4,126.4c-12.5,12.5-32.7,12.5-45.3,0-12.5-12.5-12.5-32.7,0-45.3L188.1,63.6c37.4-37.4,98.3-37.4,135.8,0l135.8,135.8c12.5,12.5,12.5,32.7,0,45.3-12.5,12.5-32.7,12.5-45.3,0l-126.4-126.4v326.3c0,17.7-14.3,32-32,32h0Z" />
                </svg>
              </CommentButton>
            </CommentInputWrapper>
          </CommentUserInfo>
        </Right>
      </Content>
    </>
  );
};

export default Detail;
