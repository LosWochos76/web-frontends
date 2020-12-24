var express = require('express');
var app = express();

var cors = require('cors')
app.use(cors());

var bodyParser = require('body-parser')
app.use(bodyParser.json({ type: 'application/json' }));

var people = [
  { 'id':'1', 'firstname':'Alexander','lastname':'Stuckenholz' },
  { 'id':'2', 'firstname':'Max','lastname':'Mustermann' }
];

app.get('/person', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(people));
});

app.put('/person/:id', function(req, res) {
	var id = req.params.id;	

	for (var o of people) {
		if (o.id == id) {
			o.firstname = req.body.firstname;
			o.lastname = req.body.lastname;
			res.end("Ok");
			return;
  		}
	}

	res.end("Error");
});

app.post('/person', function(req, res) {
	var id = people.length + 1;
	people.push({'id':id, 'firstname':req.body.firstname, 'lastname':req.body.lastname})
	res.end(JSON.stringify({ 'id' : id}));
});

app.delete('/person/:id', function(req, res) {
	var id = req.params.id;	 
	for (var i=0; i<people.length; i++) {
		if (people[i].id == id) {
			people.splice(i, 1);
			res.end("Ok");
			return;
		}
	}

	res.end("Error: Id not found!");
});

app.listen(8080);