import { useContext, useEffect } from "react";
import supabase from "../supabase";
import { UserContext } from "../context/userContext";

const useUser = () => {
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      //로그인한 사람 데이터 찾기
      const { data: userData, error: userError } =
        await supabase.auth.getUser();
      if (userError) {
        console.error("Error fetching user:", userError);
        return;
      }

      //유저 데이터 가져오기
      let { data: user, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", userData.user.id);

      if (error) {
        console.log(error);
        return;
      }
      setUser(user[0]);
    };

    fetchData();
  }, []);
};

export default useUser;
