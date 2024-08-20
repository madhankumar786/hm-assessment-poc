import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import {
  LoginPage,
  Header,
  About,
  Contact,
  SignupPage,
  Dashboard,
  CheckUser,
} from "components";
const CLIENT_ID = "Ov23liC80XliMtFoFAlD";

function App() {
  const [rerender, setRerender] = useState(false);
  const [userData, setUserData] = useState();
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParams = urlParams.get("code");
    console.log(codeParams);

    if (codeParams && localStorage.getItem("accessToken") === null) {
      async function getAccessToken() {
        await fetch("http://localhost:4000/getAccessToken?code=" + codeParams, {
          method: "GET",
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log(data, "data from getAccessToken");
            if (data.access_token) {
              localStorage.setItem("accessToken", data.access_token);
              setRerender(!rerender);
            }
          });
      }
      getAccessToken();
    }
  }, [rerender, token]);

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
  return (
    <div className="App">
      <header className="App-header">
        {(localStorage.getItem("accessToken") || (localStorage.getItem("email"))) ? (
          <>
          <CheckUser>
            <Header getUserData={getUserData} userData={userData}/>
          </CheckUser>
            <Routes>
                <Route path="/login" element={<LoginPage handleLoginWithGithub={loginWithGithubLogin} />}/>
                <Route path="/dashboard" element={<CheckUser><Dashboard/></CheckUser>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/contact" element={<Contact/>}/>
                <Route path="/signup" element={<SignupPage/>}/>
            </Routes>
          </>
        ) : (
          <>
            <Routes>
               <Route path="/" element={ <LoginPage handleLoginWithGithub={loginWithGithubLogin} />}/>
                <Route path="/signup" element={<SignupPage/>}/>
            </Routes>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
