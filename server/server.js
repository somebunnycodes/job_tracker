require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('./config/mongoose.config');

const app = express();

// cookies in express
app.use(cookieParser());
// Change the app.use(cors()) to the one below
const FRONTEND_URI = process.env.FRONTEND_URI || 'http://localhost:3000';
console.log(`Configuring CORS with frontend URI ${FRONTEND_URI}`);
app.use(cors({credentials: true, origin: FRONTEND_URI}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));   // This allows JSON Objects with strings and arrays

require('./routes/user.routes')(app);
require("./routes/job.routes")(app);
const port = 8000;
app.listen(port, () => console.log(`Listening on port: ${port}`));