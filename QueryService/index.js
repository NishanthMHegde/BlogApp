const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(bodyParser.json());
app.use(cors());
const posts = {};


app.post('/events', (req, res)=>{
	const {type, data} = req.body;
	if (type == 'PostsQuery'){
		const {id, title} = data;
		posts[id] = {id, title, comments:[]};
	}
	else if (type == 'CommentsQuery'){
		const {id, content, postId} = data;
		posts[postId].comments.push({id, content});
	}
	res.send(posts);
});

app.get('/posts', (req,res)=>{
	res.send(posts);
});

app.listen(4002, ()=>{
	console.log('Listening on port 4002');
});