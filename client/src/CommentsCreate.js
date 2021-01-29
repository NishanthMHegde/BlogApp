import React, {useState} from 'react';
import axios from 'axios';

export default ({postId}) =>{

	const [content, setContent] = useState('');
	const onSubmit = async(event) =>{
		event.preventDefault();

		await axios.post(`http://127.0.0.1:4001/posts/${postId}/comments`, {content});
		setContent('');
	};
	return (
		
		<form onSubmit={onSubmit}>
		<div className = "form-group">
		<label>New Comment</label>
		<input className="form-control" onChange={e => setContent(e.target.value)}/>
		</div>
		<button className="btn btn-primary">Add Comment</button>
		</form>
		

		);
};