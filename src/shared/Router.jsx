import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../pages/Main";
import Login from "../pages/Login";
import MyPage from "../pages/MyPage";
import SignUp from "../pages/SignUp";
import Detail from "../pages/Detail";
import NewPost from "../pages/NewPost";
import UpdatePost from "../pages/UpdatePost";
import UpdateProfile from "../components/UpdateProfile";

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/mypage/:id" element={<MyPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/detail" element={<Detail />} />
          <Route path="/detail/:id?" element={<Detail />} />
          <Route path="/newpost" element={<NewPost />} />
          <Route path="/updatepost/:id?" element={<UpdatePost />} />
          <Route path="/member" element={<UpdateProfile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
