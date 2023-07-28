//cookie
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const cookieRouter = require("./src/routers/cookie/cookie_router");

// session
const sessionRouter = require("./src/routers/session/session_router");
const session = require("express-session");
const sessionConfig = require("./config/cookie_session/config")
const bodyParser = require("body-parser");


app.set("views", "./src/views");
app.set("view engine", "ejs");


// 순서 중요
app.use(cookieParser("아무값이나 키로 설정"));
app.use("/cookie", cookieRouter);


// 순서 중요
app.use( bodyParser.urlencoded( {extended : true}) );
app.use(session(sessionConfig.sessionConfig));
app.use("/session", sessionRouter);


app.listen(3000, ()=>{console.log("3000 server");});