import React  from "react";
import { number, string } from "prop-types";
import {useSelector} from "react-redux";

const Message = ({ authorId, author, body }) => {
	const loggedUser = useSelector(state => state.loggedUser);
	const messageStyles = {
		display: 'flex',
		borderRadius: '1.875rem',
		padding: '0.625rem',
		margin: '0.625rem',
		width: 'fit-content',
		maxWidth: '31.25rem',
		backgroundColor: loggedUser.id === authorId ? '#006AFF' : 'lightGrey',
		color: loggedUser.id === authorId ? 'white' : 'black',
		fontWeight: 400,
	};
	const containerMessageStyles = {
		display: 'flex',
		flexDirection: 'column',
		margin: '0.625rem 0'
	};
	const authorStyles = {
		marginLeft: '1.25rem',
		color: 'grey',
	}

	return (
		<div style={containerMessageStyles}>
			{ loggedUser.id !== authorId && <span data-testid="authorMessage" style={authorStyles}>{author}</span> }
			<div data-testid="bodyMessage" style={messageStyles}>
				{body}
			</div>
		</div>
	);
}

Message.propTypes = {
	authorId: number.isRequired,
	author: string.isRequired,
	body: string.isRequired
}

export default Message;