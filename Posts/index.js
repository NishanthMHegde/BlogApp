const express = require('express');
const {randomBytes} = require('crypto');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const app = express();
app.use(bodyParser.json());
app.use(cors());
const posts = {};

app.post('/posts', async(req,res)=>{
	const id = randomBytes(4).toString('hex');
	const {title} = req.body;
	posts[id] = {
		id, title
	};
	await axios.post('http://127.0.0.1:4005/events', {type: 'PostsQuery', data: {id, title}});
	res.status(201).send(posts);

});

app.get('/posts', (req,res)=>{
	res.send(posts);
});

app.post('/events', (req,res)=>{
	console.log(`Event Received: ${req.body.data}`);
	res.send({});
});

app.listen(4000, ()=>{
	console.log("Listening on port 4000");
});