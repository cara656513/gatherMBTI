import styled from "styled-components";

export const Container = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

export const HeaderStyle = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
`;

export const LoginSignUp = styled.div`
  display: flex;
  gap: 30px;
  margin: 10px;
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
  margin: 20px;
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

  &:hover {
    background-color: #ffb300;
  }
`;

export const LoginButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ffb300;
  }
`;
