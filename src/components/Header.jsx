import { Link } from "react-router-dom";
import styled from "styled-components";

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

export const Header = ({ menus }) => {
  return (
    <HeaderWrapper>
      <Link to="/">
        <img
          style={{
            width: "100px",
          }}
          src="https://velog.velcdn.com/images/kang1129/post/70b67177-091d-4e2e-84a1-20ee8dee0457/image.svg"
        />{" "}
      </Link>
      <MenuWrapper>
        {menus.map((menu) => {
          return (
            <Link key={menu.index} to={menu.route}>
              {menu.menu}
            </Link>
          );
        })}
      </MenuWrapper>
    </HeaderWrapper>
  );
};
