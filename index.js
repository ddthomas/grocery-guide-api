const express = require("express");
const helmet = require("helmet");
const compress = require("compression");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const categories = require("./categories.json");

const port = 3000;
const app = express();

app.use(helmet());
app.use(cors());
app.use(compress());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use((req, res, next) => {
	console.log(req.query);
	next();
	});

app.get("/", (req, res) => {
	res.json({david:"awesome"});
});

app.get("/categories", (req, res) => {
	res.json(categories);
});

app.get("/test/:number", (req, res) => {
	res.send("My number is: " + req.param("number"));
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});