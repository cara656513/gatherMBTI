import styled from "styled-components";

const MainBox = styled.div`
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const MainCategory = styled.div`
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 401px;
  height: 174px;
  margin: 150px 760px 91px 759px;
`;

const MainCategoryMbti = styled.p`
  @font-face {
    font-family: "KBO-Dia-Gothic_medium";
    src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-2@1.0/KBO-Dia-Gothic_medium.woff")
      format("woff");
    font-weight: 700;
    font-style: normal;
  }

  font-family: "KBO-Dia-Gothic_medium", sans-serif;
  font-size: 60px;
  text-align: center;
  height: 90px;
`;

const MainCategoryMbtiSub = styled.p`
  @font-face {
    font-family: "KBO-Dia-Gothic_light";
    src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-2@1.0/KBO-Dia-Gothic_light.woff")
      format("woff");
    font-weight: 700;
    font-style: normal;
  }

  font-family: "KBO-Dia-Gothic_light", sans-serif;
  font-size: 16px;
  text-align: center;
  margin-bottom: 17px;
`;

const MainCategoryHashtag = styled.div`
  @font-face {
    font-family: "KBO-Dia-Gothic_medium";
    src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-2@1.0/KBO-Dia-Gothic_medium.woff")
      format("woff");
    font-weight: 300;
    font-style: normal;
  }

  font-family: "KBO-Dia-Gothic_medium", sans-serif;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 117px;
  height: 43px;
  border: 2px solid black;
  border-radius: 89.5px;
  text-align: center;
`;

const MainCategoryHashtagWrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const PostboxWrapper = styled.div`
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 22px 23.83px;
  flex-wrap: wrap;
  width: 1338px;
  height: auto;
  margin: 0px 291px 100px 291px;

  @media (max-width: 1400px) {
    width: 100%;
    margin: 0;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
  }
`;

const Postbox = styled.div`
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 20px;
  box-shadow: 0px 0px 9.7px rgba(0, 0, 0, 0.1);
  width: 250px;
  height: 354.17px;
`;

const PostboxImage = styled.img`
  width: 222.22px;
  height: 222.22px;
  border-radius: 20px;
  margin: 13.19px 13.89px 12px 13.89px;
`;

const PostboxContent = styled.button`
  background-color: #ffffff;
  width: 222px;
  height: 43px;
  margin: 0px 14px 0px 14px;
  border: transparent;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  cursor: pointer;
`;

const Userbox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  width: 218.75px;
  height: 29.19px;
  margin: 21.39px 14.58px 16.67px 13.17px;
`;

const UserboxImage = styled.img`
  background-color: orange;
  width: 27.78px;
  height: 27.78px;
  border-radius: 50%;
`;

const UserboxId = styled.p`
  width: 129px;
  height: 24px;
  margin: 5.19px 26.64px 0px 7.56px;
  cursor: pointer;
`;

const LikeButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fe8125;
  width: 27.78px;
  height: 27.78px;
  border-radius: 50%;
  border: transparent;
`;

const LikeButtonImage = styled.img`
  width: 15.28px;
  height: 13.37px;
  width: 15.28px;
  height: 13.37px;
  filter: brightness(0) invert(1);
`;

export {
  MainBox,
  MainCategory,
  MainCategoryMbti,
  MainCategoryMbtiSub,
  MainCategoryHashtag,
  PostboxWrapper,
  Postbox,
  PostboxImage,
  PostboxContent,
  Userbox,
  UserboxImage,
  UserboxId,
  LikeButton,
  LikeButtonImage,
  HomeBox,
  HomeLogo,
  HomeLogoText,
  SignUpButton,
  MainCategoryHashtagWrapper,
};

const HomeBox = styled.div`
  background-color: #fe8125;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 644px;
  width: 100%;
  margin-top: 100.8px;
`;

const HomeLogo = styled.img`
  width: 62.12px;
  height: 126.87px;
  margin-bottom: 12.13px;
`;

const HomeLogoText = styled.p`
  @font-face {
    font-family: "KBO-Dia-Gothic_light";
    src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-2@1.0/KBO-Dia-Gothic_light.woff")
      format("woff");
    font-weight: 700;
    font-style: normal;
  }
  font-family: "KBO-Dia-Gothic_light", sans-serif;
  font-size: 60px;
  text-align: center;

  span {
    @font-face {
      font-family: "KBO-Dia-Gothic_medium";
      src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-2@1.0/KBO-Dia-Gothic_medium.woff")
        format("woff");
      font-weight: 700;
      font-style: normal;
    }
    font-family: "KBO-Dia-Gothic_medium", sans-serif;
    font-size: 60px;
    text-align: center;
  }

  width: 493px;
  height: 180px;
`;
const SignUpButton = styled.button`
  @font-face {
    font-family: "KBO-Dia-Gothic_medium";
    src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-2@1.0/KBO-Dia-Gothic_medium.woff")
      format("woff");
    font-weight: 700;
    font-style: normal;
  }
  font-family: "KBO-Dia-Gothic_medium", sans-serif;
  font-size: 16px;
  text-align: center;

  width: 150px;
  height: 55px;
  background-color: #ffffff;
  border: 2px solid black;
  border-radius: 89.5px;
  cursor: pointer;
`;
