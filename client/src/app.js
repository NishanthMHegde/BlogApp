import React from 'react';
import PostCreate from './PostCreate';
import PostsList from './PostsList';
export default() => {
	return <div className="container">
	<PostCreate />
	<hr />
	<PostsList />
	</div>;
};