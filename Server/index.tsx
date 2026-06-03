const express = require("express")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
require("dotenv").config({path: "./config/.env"})
require("./config/db")
const {checkUser, requireAuth  } = require("./middleware/auth.middleware")
const cors = require("cors")
const app = express()
import routes from "./routes/index.route";

app.use(cors({origin: process.env.CLIENT_URL}))

const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    "allowedHeaders": ["sessionId", "content-type"],
    "exposedHeaders": ["sessionId"],
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false
}

app.use(cors(corsOptions))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser())

app.get("*", checkUser)
app.get("/jwtid", requireAuth , (res:any) => {
    res.status(200).send(res.locals.user._id)
})

app.use("/api", routes);

app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`)
})