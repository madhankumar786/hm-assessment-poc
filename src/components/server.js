const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// GitHub OAuth URLs and tokens
const GITHUB_CLIENT_ID = "Ov23lizT2Bcw1QOa9Uzv";
const GITHUB_CLIENT_SECRET = "6e11220363b66085f49bf18b7ea173982a495f0e";

app.get("/auth/github", (req, res) => {
  const redirectUri = "http://localhost:3000/auth/github/callback";
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${redirectUri}`;
  res.redirect(githubAuthUrl);
});

app.get("/auth/github/callback", async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: "Authorization code is missing" });
  }
  try {
    console.log("inside /auth/github/callback try block ");
    const response = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code,
      },
      {
        headers: {
          'Accept': "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    console.log(response, "response from post call*******");
    const { access_token } = response.data;
    
    console.log(access_token, "access_token from res");
    const userResponse = await axios.get("https://api.github.com/user", {
      headers: {
        'Authorization': `Bearer ${access_token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    res.json(userResponse.data);
  } catch (error) {
    res.status(500).json({ error: "Authentication failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
