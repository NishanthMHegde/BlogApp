const express = require('express');
const axios = require('axios');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());
const events = [];
app.post('/events', (req, res)=>{
	events.push(req.body);
	axios.post('http://127.0.0.1:4000/events', req.body);
	axios.post('http://127.0.0.1:4001/events', req.body);
	axios.post('http://127.0.0.1:4002/events', req.body);
	axios.post('http://127.0.0.1:4003/events', req.body);
});

app.get('/events', (req,res)=>{
	res.send(events);
});

app.listen(4005, ()=>{
	console.log("Listening on port 4005");
});