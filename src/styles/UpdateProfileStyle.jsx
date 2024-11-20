import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin-top: 130px;
`;

export const ImageInfor = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  margin-bottom: 20px; 
`

export const BasicImage = styled.img`
    width: 300px;
    height: 300px;
    border-radius: 200px;
    border: 2px dashed orange;
    margin: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
`

export const UpdateImage = styled.label`
  font-size: 14px;
  border-radius: 8px;
  width: 100px;
  border: 1px solid #ccc;
  padding: 5px;
  text-align: center;
  cursor: pointer;

  &:hover {
    background-color: #ffe0b2;
  }
`;

export const BasicStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top : 40px;
  gap: 10px;
`

export const LabelStyle = styled.label`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  gap: 5px;
  margin-bottom: 5px; 
`;

export const InputStyle = styled.input`
  border-radius: 8px;
  width: 100px;
  padding: 7px;
  border: 1px solid #ccc;
  transition: border-color 0.3s;

  &:focus {
    border-color: orange;
    outline: none;
  }
`;

export const SelectStyle = styled.select`
  border-radius: 8px;
  padding: 7px;
  border: 1px solid #ccc;
  transition: border-color 0.3s;
  width: 100px;

  &:focus {
    border-color: orange;
    outline: none;
  }
`;

export const UpdateButton = styled.button`
  background-color: orange;
  border-radius: 20px;
  height: 35px;
  width: 90px;
  border: none;
  cursor: pointer;
  margin-bottom: 70px;

  &:hover {
    background-color: #ffb300;
    transform: scale(1.05);
  }
`;

export const IntroduceStyle = styled.input`
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