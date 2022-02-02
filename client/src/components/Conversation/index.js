import React from "react";
import Comment from "antd/lib/comment";
import Avatar from "antd/lib/avatar/avatar";
import Tooltip from "antd/lib/tooltip";
import UserOutlined from '@ant-design/icons/UserOutlined';
import Author from "../Author";
import format from "date-fns/format";
import {string, number} from "prop-types";

const Conversation = ({ id, userId, senderId, senderNickname, recipientNickname, lastMessageTimestamp }) => {
	return (
		<Comment
			author={
				<Author
					name={userId === senderId ? recipientNickname : senderNickname}
					conversationId={id}
				/>
			}
			avatar={
				<Avatar
					icon={<UserOutlined/>}
					alt={userId === senderId ? recipientNickname : senderNickname}
				/>
			}
			content={<></>}
			datetime={
				lastMessageTimestamp && (
					<Tooltip title={format(new Date(lastMessageTimestamp * 1000), 'dd/MM/yyyy')}>
						<span data-testid="messageDate">{format(new Date (lastMessageTimestamp * 1000), 'dd/MM/yyyy')}</span>
					</Tooltip>
				)
			}
		/>
	)
}

Conversation.propTypes = {
	id: number.isRequired,
	userId: number.isRequired,
	senderId: number.isRequired,
	senderNickname: string.isRequired,
	recipientId: number.isRequired,
	recipientNickname: string.isRequired,
	lastMessageTimestamp: number
}

Conversation.defaultProps = {
	lastMessageTimestamp: null
}

export default Conversation;