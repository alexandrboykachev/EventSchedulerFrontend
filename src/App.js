import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./components/SingUp";
import Login from "./components/SingIn";
import Topbar from "./components/Global/Topbar"
import Sidebar from "./components/Global/Sidebar";
import Events from "./components/UserEvents";
import EventCreate from "./components/EventCreate";
import EventInfo from "./components/EventInfo";
import EventUpdate from "./components/EventUpdate";
import Invitations from "./components/Invitation";
import FAQ from "./components/FAQ";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import useToken from "./utils/UseToken";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  
  const { token, setToken} = useToken();
  const userId = localStorage.getItem('userId');

  return (
    <>
      {token ? (
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className="app">
              <Sidebar userId={userId} isSidebar={isSidebar} />
              <main className="content">
                <Topbar setIsSidebar={setIsSidebar} />
                <Routes>
                  <Route path="*" element={<Events userId={userId} />} />
                  <Route path="/event/create" element={<EventCreate userId={userId} />} />
                  <Route path="/event/info" element={<EventInfo userId={userId}/>} />
                  <Route path="/event/update" element={<EventUpdate />} />
                  <Route path="/invitation" element={<Invitations userId={userId} />} />
                  <Route path="/faq" element={<FAQ />} />
                </Routes>
              </main>
            </div>
          </ThemeProvider>
        </ColorModeContext.Provider>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      )}
    </>
  );
}

export default App;
