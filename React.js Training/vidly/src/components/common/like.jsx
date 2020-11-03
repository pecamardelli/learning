import React from 'react';
import 'font-awesome/css/font-awesome.min.css';

const Like	= props => {
	return (
		<React.Fragment>
			<i
				className={props.liked ? "fa fa-heart" : "fa fa-heart-o"}
				onClick={props.onClick}
				role='button'>
			</i>
		</React.Fragment>
	);
}

export default Like;
