import styled from "styled-components";

export const Container = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin-top: 120px;
`;

export const SignUpInput = styled.div`
  display: flex;
  flex-direction: row;
  gap: 150px;
  margin: 10px;
`;

export const BasicInfor = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const AccountInfor = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const Introduction = styled.input`
  width: 500px;
  height: 50px;
  border-radius: 8px;
  margin: 20px 5px 20px 5px;
  padding: 10px;
  border: 1px solid #ccc;
  transition: border-color 0.3s;

  &:focus {
    border-color: orange;
    outline: none;
  }
`;

export const SignUpButton = styled.button`
  background-color: orange;
  border-radius: 20px;
  height: 35px;
  width: 90px;
  border: 1px solid black;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-bottom: 70px;

  &:hover {
    background-color: #ffb300;
  }
`;
