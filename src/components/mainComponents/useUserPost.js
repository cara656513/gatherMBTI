import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../supabase";
import { UserContext } from "../../context/userContext";

export const useUserPost = () => {
  const { user: currentUser } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [userMbti, setUserMbti] = useState("");
  const [loading, setLoading] = useState(true); // 로딩 상태

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // 로딩 시작
      try {
        // 전체 사용자 데이터 가져오기
        const { data: allUsers, error: usersError } = await supabase
          .from("users")
          .select("*");
        if (usersError) {
          console.error("전체 사용자 정보 불러오기 실패 : ", usersError);
          return;
        }

        setUsers(allUsers);
        console.log(currentUser);
        // 현재 로그인된 사용자의 MBTI 정보 설정
        if (currentUser) {
          const loggedInUser = allUsers.find(
            (user) => user.id === currentUser.id
          );
          if (loggedInUser) {
            setUserMbti(loggedInUser.mbti);
          }
        }

        // 게시글 데이터 가져오기
        const { data: postData, error: postsError } = await supabase
          .from("posts")
          .select("*")
          .order("created_at", { ascending: false });
        if (postsError) {
          console.error("Error fetching posts:", postsError);
          return;
        }
        setPosts(postData);

        // 로딩 종료
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUser]);

  return { posts, users, userMbti, currentUser, loading };
};
