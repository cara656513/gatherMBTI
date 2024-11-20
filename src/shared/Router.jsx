import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../pages/Main";
import Login from "../pages/Login";
import MyPage from "../pages/MyPage";
import SignUp from "../pages/SignUp";
import Detail from "../pages/Detail";
import NewPost from "../pages/NewPost";
import UpdatePost from "../pages/UpdatePost";
import { MainProvider } from "../components/mainComponents/MainContext";

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <MainProvider>
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
          </Routes>
        </MainProvider>
      </BrowserRouter>
    </>
  );
};

export default Router;
