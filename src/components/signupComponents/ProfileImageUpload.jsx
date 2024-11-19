import React from "react";
import styled from "styled-components";

const SignUpImg = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  margin: -10px;
  gap: 8px;
`;

const ImgLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 200px;
  height: 200px;
  background-color: orange;
  border: 2px dashed black;
  cursor: pointer;
  font-size: 50px;
  overflow: hidden;

  &:hover {
    background-color: #ffb300;
  }
`;

const PlusImgStyle = styled.img`
  width: 200px;
  height: 200px;
  border-radius: '50%';
  object-fit: 'cover';
`;

const PlusImgInput = styled.input`
  display: none;
`;

const ProfileImageUpload = ({ children, profileImg, setProfileImg }) => {
  const handleProfileImgChange = (e) => {
    setProfileImg(e.target.files[0]);
  };

  return (
    <div>
      <SignUpImg>
        {children}
        <ImgLabel htmlFor="fileInput">
          {profileImg ? (
            <PlusImgStyle
              id="fileInput"
              src={URL.createObjectURL(profileImg)}
              alt="ProfileImg"
            />
          ) : (
            "+"
          )}
          <PlusImgInput
            id="fileInput"
            type="file"
            accept="image"
            onChange={handleProfileImgChange}
          />
        </ImgLabel>
      </SignUpImg>
    </div>
  );
};

export default ProfileImageUpload;