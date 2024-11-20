import { useState } from "react";
import Footer from "./components/Footer";
import { UserContext } from "./context/userContext";
import Router from "./shared/Router";

function App() {
<<<<<<< HEAD
=======

>>>>>>> 9346efc27911a41d07a0bf552839dc57ade54b76
  const [user, setUser] = useState();

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <Router />
        <Footer />
      </UserContext.Provider>
    </>
  );
}

export default App;
