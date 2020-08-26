const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const cors = require('cors')

const whitelist = [process.env.PUBLIC_DOMAIN]
const corsOptions = {
    origin: ["http://localhost:3000", "https://go-ride-d9ff1.web.app"],
    credentials: true
}

module.exports = app => {
    app.use(logger('dev'))
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({
        extended: false
    }))
    app.use(cookieParser())
    app.use(cors(corsOptions))
}