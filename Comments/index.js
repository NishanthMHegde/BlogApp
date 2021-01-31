const express = require('express');
const {randomBytes} = require('crypto');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const app = express();
app.use(bodyParser.json());
app.use(cors());
const commentsByPostID = {};

app.get('/posts/:id/comments', (req,res) =>{
	res.send(commentsByPostID[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req,res)=>{
	const commentId = randomBytes(4).toString('hex');
	const comments = commentsByPostID[req.params.id] || [];
	const {content} = req.body;
	comments.push({id: commentId, content});
	commentsByPostID[req.params.id] = comments;
	await axios.post('http://127.0.0.1:4005/events', {type: 'CommentsQuery', data: {id: commentId, content, postId:req.params.id}});
	res.status(201).send(comments);
});

app.post('/events', (req,res)=>{
	console.log(`Event Received: ${req.body.data}`);
	res.send({});
});
app.listen(4001, ()=>{
	console.log('Listening on port 4001');
});