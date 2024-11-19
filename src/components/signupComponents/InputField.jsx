import React from "react";
import styled from "styled-components";

const LabelStyle = styled.label`
  display: flex;
  flex-direction: column;
  font-size: 14px;
`;

const InputStyle = styled.input`
  border-radius: 8px;
  width: 200px;
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

const InputField = ({ children, type, state, placeholder, onChange }) => {
  return (
    <div>
      <LabelStyle>
        <p>
          {children}
          <StarText>*</StarText>
        </p>
        <InputStyle
          type={type}
          state={state}
          placeholder={placeholder}
          onChange={onChange}
          required
        />
      </LabelStyle>
    </div>
  );
};

export default InputField;
