const express = require('express');
const axios = require('axios');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

app.post('/events', async (req,res)=>{
	const {type, data} = req.body;
	if (type === 'CommentsQuery'){
		console.log("Received CommentsQuery");
		const {id, postId, content} = data;
		const status = content.includes('fcuk')? 'rejected': 'approved';
		await axios.post('http://eventbus-clusterip-srv:4005/events',{
			type: 'CommentsModerated',
			data:{
				id,
				postId,
				content,
				status
			}
		});

	}
});
app.listen(4003, ()=>{
	console.log('Listening on port 4003');
});