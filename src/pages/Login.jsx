import { Navigate, useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import LoginComponent from "../components/LoginComponent";

const Login = () => {
  const navigate = useNavigate () ; 
  const Logout = async() => {
    const { data, error } = await supabase.auth.signOut();
    console.log("signout: ", { data, error }); // data는 딱히 필요없을 듯
    navigate  = ("/login")
  }

  return (
    <>
      <Header menus={[
        { route: "/signup", menu: "회원가입" },
        
       
      ]}
         Logout={Logout}
      />

      <LoginComponent />
    </>
  );
};

export default Login;
