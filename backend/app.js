const express = require('express');
const cors = require('cors');
const app = express();
// const cookieSession = require("cookie-session");
const session = require("express-session");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const webhookRoutes = require("./routes/webhookRoutes");

require("dotenv").config();

app.use(express.json());

// Set up cookie-based session middleware
// app.use(
//     cookieSession({
//         name: "session",
//         keys: [process.env.SESSION_SECRET],
//         maxAge: 24 * 60 * 60 * 1000,
//         httpOnly: true,
//         // secure: true,
//         sameSite: 'lax',
//     })
// );

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        // secure: true,
        cookie: {
            // httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: 'lax',
        }
        
    })
);

// Allow CORS
app.use(
    '/webhook',
    cors({
        origin: '*',
        credentials: true,
    })
);

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
);

// Authentication routes
app.use("/auth", authRoutes);

// Task routes
app.use("/data", taskRoutes);

// webhook
app.use("/webhook", webhookRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));