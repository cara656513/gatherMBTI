import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../pages/Main";
import Login from "../pages/Login";
import MyPage from "../pages/MyPage";
import SignUp from "../pages/SignUp";
import Detail from "../pages/Detail";
import NewPost from "../pages/NewPost";
import UpdatePost from "../pages/UpdatePost";
import useUser from "../api/useUser";

const Router = () => {
  useUser();
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/detail" element={<Detail />} />
          <Route path="/detail/:id?" element={<Detail />} />
          <Route path="/newpost" element={<NewPost />} />
          <Route path="/updatepost/:id?" element={<UpdatePost />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
