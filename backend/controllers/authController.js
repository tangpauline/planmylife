const { OAuth2Client } = require("google-auth-library");
require("dotenv").config();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_CALLBACK_URI = process.env.GOOGLE_CALLBACK_URI;
const GOOGLE_OAUTH_SCOPES = ["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email"]

// Initialize new client for OAuth
const client = new OAuth2Client(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_CALLBACK_URI,
);

// GET /auth/google
const googleAuth = (req, res) => {
    const callbackUri = GOOGLE_CALLBACK_URI;
    const authUrl = client.generateAuthUrl({
        access_type: "offline",
        scope: GOOGLE_OAUTH_SCOPES.join(" "),
        redirect_uri: callbackUri,
        client_id: GOOGLE_CLIENT_ID,
    });
    res.redirect(authUrl);
};

// GET /auth/google/callback
const googleCallback = async (req, res) => {
    const { code } = req.query;
  
    if (!code) {
        return res.status(400).json({ message: "No authorization code provided" });
    }
  
    try {
        // Exchange the code for tokens
        const { tokens } = await client.getToken({
            code,
            client_id: GOOGLE_CLIENT_ID,
            client_secret: GOOGLE_CLIENT_SECRET,
            redirect_uri: GOOGLE_CALLBACK_URI,
        });
  
        // Verify the ID token -> get ticket -> store user
        const ticket = await client.verifyIdToken({
            idToken: tokens.id_token,
            audience: GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        req.session.user = {
            user_id: payload.sub,
            name: payload.name,
            email: payload.email,
            picture: payload.picture,
        };

        console.log("in callback:", req.session);

        // Redirect back to the frontend (e.g., dashboard)
        res.redirect(process.env.CLIENT_URL + "/dashboard");
    } catch (error) {
        console.error("Google OAuth callback error:", error);
        res.redirect(process.env.CLIENT_URL);
    }
};

// GET /auth/session
const sessionExists = (req, res) => {
    // console.log("in session exists: ", req.session);
    if (!req.session.user) {
        return res.status(401).json({ error: "No session found" });
    }
    res.json({user: req.session.user});
}

// POST /auth/logout -> Logs a user out and ends session
const logout = (req, res) => {
    req.session.cookie.maxAge = 0;
    // req.session = null;
    // req.session.connect.sid= null
    req.session.destroy((err) => {
        if (err) {
          return res.status(500).send('Failed to log out');
        }
        res.clearCookie('connect.sid');
        // req.session.cookie.maxAge = 0;
        // req.session = null;
        return res.json({result: "log out successful"});
    });    
};

module.exports = { googleAuth, googleCallback, sessionExists, logout };
