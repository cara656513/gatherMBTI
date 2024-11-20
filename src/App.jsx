import { useState } from "react";
import Footer from "./components/Footer";
import { UserContext } from "./context/userContext";
import Router from "./shared/Router";

function App() {
  const [user, setUser] = useState(null);

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
