import { Link } from "react-router-dom";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import supabase from "../supabase";
const HeaderWrapper = styled.div`
  height: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid #d8d8d8;
  position: fixed;
  top: 0;
  width: 100%;
  background-color: white;
`;

const MenuWrapper = styled.div`
  a {
    padding: 0 30px 0 30px;
  }
  * {
    font-family: "KBO_Dia_Gothic_light";
  }
`;
const LargeButton = styled.button`
    width: 150px;
    height: 55px;
    font-size: 16px;
  
    background: none;
    border: none;
     `

export const Header = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Logout error:", error);
    } else {
      console.log("Successfully logged out");
      navigate("/login");
    }
  };
  const menus = [{
    route: '/newpost',
    menu: '글쓰기',
    type: 'link'
  },
  {
    route: '/mypage',
    menu: '마이 페이지',
    type: 'link'
  },
  {
    route: '/signup',
    menu: '회원가입',
    type: 'link'
  },
  {
    route: '/login',
    menu: '로그인',
    type: 'link'
  },
  
  {
    onClick: handleLogout,

    menu: '로그아웃',
    type: 'button'

  },
 

  ]

  
  return (
    <HeaderWrapper>
      <Link to="/">
        <img
          style={{
            width: "100px",
          }}
          src="src/images/logo.svg"
        />{""}
      </Link>
      <MenuWrapper>
        {menus.map((menu) => {
          return menu.type === 'button' ? (
         
            <LargeButton onClick={menu.onClick}>{menu.menu} </LargeButton>
          ) : (
            <Link to={menu.route}>{menu.menu}</Link>
          );
        })}

      </MenuWrapper>
    </HeaderWrapper>
  );
};
