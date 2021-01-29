const express = require('express');
const {randomBytes} = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(bodyParser.json());
app.use(cors());
const commentsByPostID = {};

app.get('/posts/:id/comments', (req,res) =>{
	res.send(commentsByPostID[req.params.id] || []);
});

app.post('/posts/:id/comments', (req,res)=>{
	const commentId = randomBytes(4).toString('hex');
	const comments = commentsByPostID[req.params.id] || [];
	const {content} = req.body;
	comments.push({id: commentId, content});
	commentsByPostID[req.params.id] = comments;
	res.status(201).send(comments);
});
app.listen(4001, ()=>{
	console.log('Listening on port 4001');
});