import React, {useEffect, useMemo, useRef, useState} from "react";
import Card from "antd/lib/card";
import Button from "antd/lib/button";
import LoadingOutlined from "@ant-design/icons/LoadingOutlined";
import Message from "../components/Message";
import {useDispatch, useSelector} from "react-redux";
import {getMessages, postMessage} from "../actions/messages";
import Input from "antd/lib/input";
import { SendOutlined, HomeOutlined } from '@ant-design/icons';
import {getConversations} from "../actions/conversations";
import format from "date-fns/format";
import {useHistory} from "react-router-dom";
import {useWindowWidth} from "../utils";

const Messages = ({ conversationId }) => {
	const dispatch = useDispatch();

	const loggedUser = useSelector(state => state.loggedUser);
	const messages = useSelector(state => state.messages);
	const messagesPending = useSelector(state => state.messagesPending);
	const conversations = useSelector(state => state.conversations);
	const width = useWindowWidth();

	const [friendName, setFriendName] = useState("");
	const [newMessage, setNewMessage] = useState("");
	const [lastMessageTimestamp, setLastMessageTimestamp] = useState();

	const messagesRef = useRef(null);
	const inputNewMessageRef = useRef(null);

	let history = useHistory();

	const messagesMemo = useMemo(() =>
			[
				...messages.map(({ id, authorId, body }) =>
					<div
						key={id}
						style={{
							display: 'flex',
							justifyContent: 1 === authorId ? 'flex-end' : 'flex-start',
						}}
					>
						<Message
							author={friendName}
							authorId={authorId}
							body={body}
						/>
					</div>
				), <div key="messagesRef" ref={messagesRef} />
			],
		[messages]
	);

	const updateFriendName = () => {
		const currentConversation = conversations.find(({ id }) => id === parseInt(conversationId, 10));
		if(currentConversation) {
			const {
				recipientId,
				recipientNickname,
				senderNickname,
				lastMessageTimestamp
			} = currentConversation;
			const friendName = recipientId === loggedUser.id ? senderNickname : recipientNickname;
			setFriendName(friendName);
			setLastMessageTimestamp(lastMessageTimestamp);
		} else {
			history.push(`/conversations`);
		}
	};

	useEffect(() => {
		if(inputNewMessageRef.current) {
			inputNewMessageRef.current.focus({ cursor: 'start' });
		}
		dispatch(getMessages(conversationId));
		if(conversations.length > 0) {
			updateFriendName();
		} else {
			dispatch(getConversations(loggedUser.id));
		}
	}, []);

	useEffect(() => {
		if(conversations.length > 0) {
			updateFriendName();
		}
	}, [conversations]);

	useEffect(() => {
		if(messagesRef.current) {
			messagesRef.current.scrollIntoView({ behavior: 'smooth' });
			if(messages.length > 0) {
				const { timestamp } = messages[messages.length - 1];
				setLastMessageTimestamp(timestamp);
			}
		}
	}, [messages]);

	const handleOnChangeMessage = (event) => {
		setNewMessage(event.target.value);
	};

	const handleOnSendNewMessage = () => {
		if(newMessage.trim().length) {
			dispatch(postMessage({
				id: messages.length,
				conversationId: parseInt(conversationId, 10),
				timestamp: Math.floor(Date.now() / 1000),
				authorId: loggedUser.id,
				body: newMessage.trim()
			}));
			setNewMessage("");
		}
	};

	return (
		<div>
			<Button
				style={{
					margin: '1.875rem 0 0 1.875rem',
					backgroundColor: '#ff6e14',
					border: 'none'
				}}
				type="primary"
				icon={<HomeOutlined />}
				onClick={() => history.push(`/conversations`)}
				title="accueil"
			/>
			<Card
				actions={[
					<div style={{ margin: '0.625rem' }}>
						<Input
							ref={inputNewMessageRef}
							style={{ borderRadius: '1.875rem' }}
							onPressEnter={handleOnSendNewMessage}
							onChange={handleOnChangeMessage}
							value={newMessage}
							maxLength={200}
							placeholder="Envoyer un message..."
							suffix={<SendOutlined onClick={handleOnSendNewMessage} />}
						/>
					</div>
				]}
				loading={messagesPending}
				title={
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<div style={{ display: 'flex', flexDirection: 'column' }}>
							{
								messagesPending && (
									<span>
										Chargement en cours... { messagesPending && <LoadingOutlined className="messages-loading-icon" /> }
									</span>
								)
							}
							<span>{friendName} - Vous</span>
						</div>
						{
							!messagesPending && lastMessageTimestamp && messages.length > 0 && width > 800 && (
								<div>
									<span>Dernier message le {format(new Date(lastMessageTimestamp * 1000), 'dd/MM/yyyy à HH:mm')}</span>
								</div>
							)
						}
					</div>
				}
				className="card-messages"
			>
				{ messagesMemo }
			</Card>
		</div>
	)
};

export default Messages;