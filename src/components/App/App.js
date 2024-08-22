import { useEffect, useState } from "react";
import { Routes, Route,useNavigate, Navigate } from "react-router-dom";
import {
  LoginPage,
  About,
  Contact,
  SignupPage,
  Dashboard,
  Analytics,
  GitHubCallback,
  HomePage,
  Incidents
} from "components";
const CLIENT_ID = "Ov23liC80XliMtFoFAlD";

function App() {
  const [userData, setUserData] = useState();
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token])

  async function getUserData() {
    await fetch("http://localhost:4000/getUserData", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/x-www-form-urlencoded",
        
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUserData(data);
        console.log(data);
      })
      .catch((error) => console.log(error, "error from getUserData api"));
  }

  const loginWithGithubLogin = () => {
    window.location.assign(
      "https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID
    );
  };

  const isAuthenticated = !!localStorage.getItem('accessToken');

  return (
    <div className="App">
      <header className="App-header">
      <Routes>
      <Route path="/login" element={<LoginPage handleLoginWithGithub={loginWithGithubLogin} />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/oauth/callback" element={<GitHubCallback />} />
        <Route
          path="/"
          element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />}
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="incidents" element={<Incidents />} />
          <Route index element={<Dashboard />} /> {/* Default route */}
        </Route>
        <Route path="*" element={<Navigate to="/login" />} /> {/* Fallback route */}
      </Routes>
      </header>
    </div>
  );
}

export default App;
