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
const EduContent = require('./models/eduContent');
const mongoose = require('mongoose');

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
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
	res.json({david:"test"});
});

app.get("/categories", (req, res) => {
	Category.find(function(err, categories){
		if (err) return console.log(err);
		res.json(categories);
 	});
});



app.post("/categories/new", (req, res) => {
	const dairy = new Category({ categoryName: 'Dairy' });
	console.log(dairy.categoryName);
	dairy.save(function (err) {
		if (err) return console.error(err);
		res.json(dairy);
	  });	
	console.log("POST ROUTE");

});

app.put("/categories/:id", (req, res) => {

	res.send(200);
	console.log("PUT ROUTE");

});

app.delete("/categories/:id", (req, res) => {

	res.send(200);
	console.log("DELETE ROUTE");

});

app.get("/categories/:id", (req, res) => {
	console.log("GET ROUTE");
	const categoryId = req.params.id;
	Category.findById(categoryId, function(err, categories){
		if (err) return console.log(err);
		res.json(categories);
 	});
});




app.post("/educontent/new", (req, res) => {
	const categoryId = req.body.category;
	const question = req.body.question;
	Category.findById(categoryId, function(err, category){
		if (err) return console.log(err);
		
		const contentOne = new EduContent({ 
			class: "Grocery",
			question: question,
			category: category,
			subcategory: "cereal",
			tags: ["breakfast", "oatmeal", "oats", "steel cut", "rolled", "instant"],
			text: "Typically the best oatmeal is steel cut because of its higher fiber content by virtue of being less processed."
		});
		contentOne.save(function (err) {
			if (err) return console.log(err);
			res.json(contentOne);
		});
 	});
});

app.put("/educontent/:id", (req, res) => {

	res.send(200);
	console.log("PUT ROUTE");

});

app.delete("/educontent/:id", (req, res) => {

	res.send(200);
	console.log("DELETE ROUTE");

});

app.get("/educontent/:id", (req, res) => {
	console.log("GET ROUTE");
	const eduContentId = req.params.id;
	EduContent.findById(eduContentId, function(err, eduContent){
		if (err) return console.log(err);
		res.json(eduContent);
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