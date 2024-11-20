import React from 'react'
import styled from "styled-components";

const LabelStyle = styled.label`
  display: flex;
  flex-direction: column;
  font-size: 14px;
`;

const SelectStyle = styled.select`
  border-radius: 8px;
  padding: 7px;
  border: 1px solid #ccc;
  transition: border-color 0.3s;

  &:focus {
    border-color: orange;
    outline: none;
  }
`;

const StarText = styled.span`
  color: red;
`;

  const mbtiOptions = [
    "ISTJ",
    "ISFJ",
    "INFJ",
    "INTJ",
    "ISTP",
    "ISFP",
    "INFP",
    "INTP",
    "ESTP",
    "ESFP",
    "ENFP",
    "ENTP",
    "ESTJ",
    "ESFJ",
    "ENFJ",
    "ENTJ",
  ];

const MBTISelect = ({ children, mbti, setMbti }) => {
  const handleMbtiChange = (e) => {
    setMbti(e.target.value);
  };

  return (
    <div>
      <LabelStyle>
        <div>{children}<StarText>*</StarText></div>
        <SelectStyle value={mbti} onChange={handleMbtiChange} required>
          <option value="">MBTI 선택</option>
          {mbtiOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </SelectStyle>
      </LabelStyle>
    </div>
  );
};

export default MBTISelect