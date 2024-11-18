import styled from "styled-components";

const FooterWrapper = styled.div`
  position: relative;
  border-top: 1px solid #d8d8d8;
  height: 70px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-family: "KBO_Dia_Gothic_light";
`;

const Footer = () => {
  return (
    <FooterWrapper>
      COPYRIGHT 2024. Team Joppae🤫. ALL RIGHTS RESERVED.
    </FooterWrapper>
  );
};

export default Footer;
