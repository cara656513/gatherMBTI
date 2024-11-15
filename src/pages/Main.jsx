import { useEffect } from "react";
import supabase from "../supabase";

const Main = () => {
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("id").select("*");

      if (error) {
        console.error("데이터 가져오기 오류:", error);
      }
      console.log("Supabase 데이터:", data);
    };

    fetchData();
  }, []);

  return <div>Main</div>;
};

export default Main;
