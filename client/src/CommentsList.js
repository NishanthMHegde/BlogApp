import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default({comments}) => {

	const renderedComments = comments.map(comment=>{
		let content;
		if (comment.status === 'pending'){
			content = "This comment is pending moderation";
		}
		else if (comment.status === 'rejected'){
			content = "This comment was rejected";
		}
		else{
			content = comment.content;
		}
		return (
			<li key={comment.id}>{content}</li>
			);
	});

	return (<ul>{renderedComments}</ul>);
};