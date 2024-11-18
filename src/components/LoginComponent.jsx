import React, { useEffect, useState } from 'react'
import supabase from '../supabase'
import { useNavigate } from 'react-router-dom';
const LoginComponent = () => {
     const [user , setuser] = useState(null); 
     const [email , setemail] = useState(""); 
     const [password , setpassword ] = useState(""); 
     const navigate = useNavigate();
     const [errorMessage, setErrorMessage] = useState("");
     const onChangeEmail = (e) => {
      setemail(e.target.value);
    };      
  
    const onChangePassword = (e) => {
      setpassword(e.target.value);
    };
  
    const signInUser = async (e)=> {
      e.preventDefault();
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) {
        console.error("로그인 실패:", error.message);
         console.log(error)
        }
       else {
        console.log("로그인 성공:", data);
        setErrorMessage("")
        navigate('/')
      }
      
    
  
    }   

  return (
    
    <form action="" onSubmit = {signInUser} > 
    <span>이메일</span>
    <input type="text" placeholder='이메일을 입력하세요'  value={email} onChange={onChangeEmail} />
    <span>비밀번호</span>
    <input type="password" placeholder='비밀번호를 입력하세요' value={password} onChange={onChangePassword}/>
    <button type='subimt' >로그인</button>
    { <p style={{ color: "red" }}>{errorMessage}</p>}
    </form>
  )
}

export default LoginComponent






