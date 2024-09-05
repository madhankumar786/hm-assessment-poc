import { useEffect } from "react";
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
  Incidents,
  WidgetDetails
} from "components";
const CLIENT_ID = "Ov23liC80XliMtFoFAlD";

function App() {
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token])

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
          <Route index element={<Navigate to="/dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="incidents" element={<Incidents />} />
        </Route>
        <Route path="widgetDetails" element={<WidgetDetails />} />
        <Route path="*" element={<Navigate to="/login" />} /> 
      </Routes>
      </header>
    </div>
  );
}

export default App;
