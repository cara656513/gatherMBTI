import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../supabase";


export const MainContext = createContext();

export const MainProvider = ({ children }) => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const [userMbti, setUserMbti] = useState("");
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true); // 로딩 상태
  
    useEffect(() => {
      const fetchData = async () => {
        setLoading(true); // 로딩 시작
        try {
          // 현재 로그인 된 사용자 데이터 가져오기
          const { data: userData, error: userError } =
            await supabase.auth.getUser();
          if (userError) {
            console.error("사용자 정보 불러오기 실패 : ", userError);
            return;
          }
          console.log("userData : ", userData);
          setCurrentUser(userData.user);
  
          // 전체 사용자 데이터 가져오기
          const { data: allUsers, error: usersError } = await supabase
            .from("users")
            .select("*");
          if (usersError) {
            console.error("전체 사용자 정보 불러오기 실패 : ", usersError);
            return;
          }
          console.log("allUsers : ", allUsers);
          setUsers(allUsers);
  
          // 현재 로그인된 사용자의 MBTI 정보 설정
          if (userData.user) {
            const loggedInUser = allUsers.find(
              (user) => user.id === userData.user.id
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
    }, []);
  
    const filteredPosts = posts.filter((post) => {
      const user = users.find((user) => user.id === post.user_id);
      return user && user.mbti === userMbti;
    });
  
    // 로딩 중일 때 빈 화면  렌더링
    if (loading) {
      return null;
    }

    console.log({filteredPosts})
    return (
        <MainContext.Provider value={{ filteredPosts, navigate, posts, users, userMbti, currentUser, loading }}>
            {children}
        </MainContext.Provider>
    )
}