require('dotenv').config();
const express = require("express");
const helmet = require("helmet");
const compress = require("compression");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const db = require("./libs/conection");
const Category = require("./models/category");
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

app.get("/categories/new", (req, res) => {
	const dairy = new Category({ categoryName: 'Dairy' });
	console.log(dairy.name);
	dairy.save(function (err) {
		if (err) return console.error(err);
		res.json(dairy);
	  });	
	
});



app.get("/test/:number", (req, res) => {
	res.send("My number is: " + req.param("number"));
});



db.once('open', function() {
	app.listen(port, () => {
		console.log(`Example app listening at http://localhost:${port}`);
	});
	// we're connected!
  });