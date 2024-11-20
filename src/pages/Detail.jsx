import { useEffect, useState } from "react";
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
} from "../styles/DetailStyles";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { Header } from "../components/Header";
import menuDots from "../images/menu-dots.svg";
import arrowUp from "../images/arrow-up.svg";

const Detail = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [currentUser, setCurrentUser] = useState(null); // 로그인한 유저 정보

  const { id } = useParams(); //게시물아이디
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      // 게시글 데이터 가져오기
      const { data: postData, error: postError } = await supabase
        .from("posts")
        .select("*");
      if (postError) console.log("Error fetching posts:", postError);
      else setPosts(postData);

      // 유저 데이터 가져오기
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("*");
      if (userError) console.log("Error fetching users:", userError);
      else setUsers(userData);

      // 댓글 데이터 가져오기
      const { data: commentsData, error: commentsError } = await supabase
        .from("comments")
        .select("*")
        .eq("post_id", id);
      if (commentsError) console.log("Error fetching comments:", commentsError);
      else setComments(commentsData);

      // 현재 로그인한 유저 정보 가져오기
      const { data: currentUserData, error: authError } =
        await supabase.auth.getUser();
      if (authError) console.log("Error fetching current user:", authError);
      else setCurrentUser(currentUserData.user);
    };

    fetchData();
  }, [id]);

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

  const handleAddComment = async () => {
    if (newComment.trim() === "") return;

    // 현재 로그인한 사용자 정보 가져오기
    const { data: userData, error: authError } = await supabase.auth.getUser();
    if (authError || !userData) {
      Swal.fire({
        title: "로그인 필요",
        text: "댓글을 작성하려면 로그인이 필요합니다.",
        icon: "warning",
      });
      return;
    }

    const newCommentData = {
      user_id: userData.user.id,
      content: newComment,
      post_id: id,
    };

    // Supabase에 댓글 추가
    const { data, error } = await supabase
      .from("comments")
      .insert(newCommentData)
      .select("*, users(profile_img)"); // 유저의 프로필 이미지 포함하여 가져오기

    if (error) {
      Swal.fire({
        title: "댓글 추가 실패",
        text: "댓글을 추가하는 데 실패했습니다.",
        icon: "error",
      });
    } else {
      // 댓글 상태 업데이트
      setComments([
        ...comments,
        {
          ...data[0],
          user: {
            profile_img: users.find((user) => user.id === userData.user.id)
              ?.profile_img,
          },
        },
      ]);
      setNewComment(""); // 입력란 초기화
    }
  };

  const handleDeleteComment = async (commentId) => {
    // 현재 로그인한 사용자 정보 가져오기
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData) {
      Swal.fire({
        title: "삭제 실패",
        text: "로그인이 필요합니다.",
      });
      return;
    }

    // 삭제하려는 댓글 정보 가져오기
    const { data: commentData, error: commentError } = await supabase
      .from("comments")
      .select("user_id")
      .eq("id", commentId)
      .single();

    if (commentError || !commentData) {
      Swal.fire({
        title: "삭제 실패",
        text: "댓글 정보를 가져올 수 없습니다.",
      });
      return;
    }

    // 현재 사용자와 댓글 작성자 비교
    if (commentData.user_id !== userData.user.id) {
      Swal.fire({
        title: "삭제 불가",
        text: "다른 사용자의 댓글은 삭제할 수 없습니다.",
      });
      return;
    }

    // 댓글 삭제
    const { error } = await supabase
      .from("comments")
      .delete()
      .eq("id", commentId);

    if (error) {
      console.log("Error deleting comment:", error);
      Swal.fire({
        title: "삭제 실패",
        text: "댓글 삭제에 실패했습니다.",
      });
    } else {
      setComments(comments.filter((comment) => comment.id !== commentId)); // 상태에서 댓글 제거
      Swal.fire({
        title: "삭제 완료",
        text: "댓글이 삭제되었습니다.",
      });
      closeModal(); // 모달 닫기
    }
  };

  const handleEditComment = async (commentId, content) => {
    // 현재 로그인한 사용자 정보 가져오기
    const { data: userData, error: authError } = await supabase.auth.getUser();

    if (authError || !userData) {
      Swal.fire({
        title: "수정 불가",
        text: "로그인이 필요합니다.",
      });
      return;
    }

    // 댓글의 작성자 정보 가져오기
    const { data: commentData, error: commentError } = await supabase
      .from("comments")
      .select("user_id")
      .eq("id", commentId)
      .single();

    if (commentError || !commentData) {
      Swal.fire({
        title: "수정 불가",
        text: "댓글 정보를 가져올 수 없습니다.",
      });
      return;
    }

    // 현재 로그인한 사용자와 댓글 작성자 비교
    if (commentData.user_id !== userData.user.id) {
      Swal.fire({
        title: "수정 불가",
        text: "다른 사용자의 댓글은 수정할 수 없습니다.",
      });
      return;
    }

    // 댓글 수정 가능 상태로 설정
    setEditCommentId(commentId);
    setEditContent(content);
    closeModal(); // 메뉴 닫기
  };

  const saveEditComment = async () => {
    if (!editContent.trim()) {
      //인풋내용이 빈칸일때 입력하라고 알림
      alert("내용을 입력해주세요.");
      return;
    }

    const { error } = await supabase
      .from("comments")
      .update({ content: editContent }) // 수정할 내용
      .eq("id", editCommentId); // 수정할 댓글의 ID

    if (error) {
      console.log("Error updating comment:", error);
      Swal.fire({
        title: "수정 실패",
        text: "댓글수정이 실패되었습니다.",
      });
    } else {
      setComments(
        comments.map((comment) =>
          comment.id === editCommentId
            ? { ...comment, content: editContent }
            : comment
        )
      );
      setEditCommentId(null);
      setEditContent("");
      Swal.fire({
        title: "수정 완료",
        text: "댓글이 수정되었습니다.",
      });
    }
  };

  const handleDeletePost = async (postId) => {
    Swal.fire({
      title: "정말 삭제하시겠습니까?",
      text: "이 작업은 되돌릴 수 없습니다.",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { error } = await supabase
          .from("posts")
          .delete()
          .eq("id", postId); // 게시글 ID로 삭제

        if (error) {
          console.log("Error deleting post:", error);
          Swal.fire("삭제 실패", "게시글 삭제에 실패했습니다.");
        } else {
          Swal.fire("삭제 완료", "게시글이 삭제되었습니다.");
          navigate("/"); // 삭제 후 메인 페이지로 이동
        }
      }
    });
  };

  return (
    <>
      <Header />
      {posts
        .filter((post) => {
          return post.id === id;
        })
        .map((post) => {
          return (
            <Content key={post.id}>
              <Left>
                <img src={post.picture} alt="" />
              </Left>
              <Right>
                <UserInfo>
                  <UserImg>
                    <img
                      src={
                        users.find((user) => user.id === post.user_id)
                          ?.profile_img ||
                        "https://dpsocvfllvgybxswytnl.supabase.co/storage/v1/object/public/profile_img/default-profile.jpg"
                      }
                      alt="User Profile"
                    />
                  </UserImg>
                  <Nickname>
                    {users
                      .filter((user) => user.id === post.user_id)
                      .map((user) => user.nickname)}
                  </Nickname>

                  {/* MenuDots: 게시글 작성자인 경우에만 표시 */}
                  {currentUser && currentUser.id === post.user_id && (
                    <MenuDots onClick={() => toggleMenu(1)}>
                      <img src={menuDots} />
                    </MenuDots>
                  )}
                  {visibleMenuId === 1 && (
                    <Modal onClose={closeModal}>
                      <button
                        id={id}
                        onClick={(e) => navigate(`/updatepost/${e.target.id}`)}
                      >
                        수정
                      </button>
                      <button onClick={() => handleDeletePost(id)}>삭제</button>
                    </Modal>
                  )}
                </UserInfo>

                <ContentText>{post.content}</ContentText>

                <CommentList>
                  {comments.map((comment) => (
                    <UpComment key={comment.id}>
                      <UserImg>
                        <img
                          src={
                            users.find((user) => user.id === comment.user_id)
                              ?.profile_img ||
                            "https://dpsocvfllvgybxswytnl.supabase.co/storage/v1/object/public/profile_img/default-profile.jpg"
                          }
                          alt="User Profile"
                        />
                      </UserImg>

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

                          {/* MenuDots: 댓글 작성자인 경우에만 표시 */}
                          {currentUser &&
                            currentUser.id === comment.user_id && (
                              <MenuDots>
                                <CommentMenuDots
                                  onClick={() => toggleMenu(comment.id)}
                                >
                                  <img src={menuDots} />
                                </CommentMenuDots>
                                {visibleMenuId === comment.id && (
                                  <Modal onClose={closeModal}>
                                    <button
                                      onClick={() =>
                                        handleEditComment(
                                          comment.id,
                                          comment.content
                                        )
                                      }
                                    >
                                      수정
                                    </button>
                                    <button
                                      onClick={() =>
                                        handleDeleteComment(comment.id)
                                      }
                                    >
                                      삭제
                                    </button>
                                  </Modal>
                                )}
                              </MenuDots>
                            )}
                        </>
                      )}
                    </UpComment>
                  ))}
                </CommentList>

                <CommentUserInfo>
                  <UserImg>
                    <img
                      src={
                        currentUser
                          ? users.find((user) => user.id === currentUser.id)
                              ?.profile_img ||
                            "https://dpsocvfllvgybxswytnl.supabase.co/storage/v1/object/public/profile_img/default-profile.jpg"
                          : "https://dpsocvfllvgybxswytnl.supabase.co/storage/v1/object/public/profile_img/default-profile.jpg"
                      }
                      alt="User Profile"
                    />
                  </UserImg>
                  <CommentInputWrapper>
                    <CommentInput
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="댓글을 입력하세요..."
                    />
                    <CommentButton onClick={handleAddComment}>
                      <img src={arrowUp} />
                    </CommentButton>
                  </CommentInputWrapper>
                </CommentUserInfo>
              </Right>
            </Content>
          );
        })}
    </>
  );
};

export default Detail;
