const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const app = express();
app.use(bodyParser.json());
app.use(cors());
const posts = {};


const handleEvent = (type, data)=>{
if (type === 'PostsQuery'){
		const {id, title} = data;
		posts[id] = {id, title, comments:[]};
	}
	if (type === 'CommentsQuery'){
		const {id, content, postId, status} = data;
		posts[postId].comments.push({id, content, status});
	}

	if (type === 'CommentsUpdated'){
		const {id, content, postId, status} = data;
		const comments = posts[postId].comments;
		const comment = comments.find(comment=>{
			return comment.id === id;
		});
		comment.status = status;
		comment.content = content;
		console.log(comments);
	}
};
app.post('/events', (req, res)=>{
	const {type, data} = req.body;
	handleEvent(type, data);
	res.send(posts);
});



app.get('/posts', (req,res)=>{
	res.send(posts);
});

app.listen(4002, async ()=>{
	console.log('Listening on port 4002');
	const res = await axios.get('http://127.0.0.1:4005/events');
	for(let event of res.data){
		console.log(`Processing event:${event.type}`);
		handleEvent(event.type, event.data);
	}
});