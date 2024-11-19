import React, { useEffect, useState } from "react";
import supabase from "../supabase"; // Supabase 클라이언트
import Modal from "../components/Modal"; // 모달 import
import {
  Content,
  Left,
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
import { useParams } from "react-router-dom";

const Detail = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);

  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("posts").select("*");
      if (error) {
        console.log("error => ", error);
      } else {
        console.log("data => ", data);
        setPosts(data);
      }
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("*");

      if (error) {
        console.log(userError);
        return;
      }
      setUsers(userData);
    };
    fetchData();
  }, []);
  console.log(users);

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
  console.log(posts);
  return (
    <Content>
      {posts
        .filter((post) => {
          return post.id === id;
        })
        .map((post) => {
          return (
            <div key={post.id}>
              <Left>
                <img src={post.picture} alt="" />
              </Left>
              <h2>내용: {post.content}</h2>
              <h2>
                닉네임:
                {users
                  .filter((user) => user.id === post.user_id)
                  .map((user) => user.nickname)}
              </h2>
            </div>
          );
        })}
      <Left> </Left>

      <Right>
        <UserInfo>
          <UserImg>
            <img src="src/images/IMG_1234.jpg" alt="" />
          </UserImg>
          <Nickname>유저닉네임</Nickname>
          <MenuDots onClick={() => toggleMenu(1)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="512"
              height="512"
            >
              <circle cx="21.517" cy="12.066" r="2.5" />
              <circle cx="12" cy="12" r="2.5" />
              <circle cx="2.5" cy="12" r="2.5" />
            </svg>
          </MenuDots>
          {visibleMenuId === 1 && (
            <Modal>
              <button onClick={() => alert("수정 클릭!")}>수정</button>
              <button onClick={() => alert("삭제 클릭!")}>삭제</button>
            </Modal>
          )}
        </UserInfo>

        <ContentText>오잉</ContentText>

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
                    />
                    <CommentEditButton onClick={saveEditComment}>
                      저장
                    </CommentEditButton>
                  </CommentInputWrapper>
                </CommentUserInfo>
              ) : (
                <>
                  <Comment>{comment.content}</Comment>
                  <MenuDots>
                    <CommentMenuDots onClick={() => toggleMenu(comment.id)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
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
                        <button onClick={() => handleDeleteComment(comment.id)}>
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
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="512"
                height="512"
              >
                <path d="M256,476.5c-8.8,0-16.8-3.6-22.6-9.4-5.8-5.8-9.4-13.8-9.4-22.6V118.2s-126.4,126.4-126.4,126.4c-12.5,12.5-32.7,12.5-45.3,0-12.5-12.5-12.5-32.7,0-45.3L188.1,63.6c37.4-37.4,98.3-37.4,135.8,0l135.8,135.8c12.5,12.5,12.5,32.7,0,45.3-12.5,12.5-32.7,12.5-45.3,0l-126.4-126.4v326.3c0,17.7-14.3,32-32,32h0Z" />
              </svg>
            </CommentButton>
          </CommentInputWrapper>
        </CommentUserInfo>
      </Right>
    </Content>
  );
};

export default Detail;
