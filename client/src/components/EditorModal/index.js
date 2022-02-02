import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from 'antd/lib/form';
import Button from 'antd/lib/button';
import Modal from "antd/lib/modal";
import Select from "antd/lib/select";
import { bool, func } from "prop-types";
import {getUsers} from "../../actions/users";

const { Option } = Select;

const EditorModal = ({ isVisible, onCancel, onSubmit }) => {

	const dispatch = useDispatch();
	const selectUserRef = useRef(null);
	const loggedUser = useSelector(state => state.loggedUser);
	const users = useSelector(state => state.users);
	const conversations = useSelector(state => state.conversations);
	const [newConversation, setNewConversation] = useState({});

	useEffect(() => {
		dispatch(getUsers());
		selectUserRef.current.focus({ cursor: 'start' });
	}, []);

	const handleOnChangeUserConversation = (userId) => {
		const { id, nickname } = users.find(({ id }) => id === parseInt(userId, 10))
		setNewConversation({
			id: conversations.length + 1,
			recipientId: id,
			recipientNickname: nickname,
			senderId: loggedUser.id,
			senderNickname: loggedUser.nickname,
			lastMessageTimestamp: Math.floor(Date.now() / 1000)
		});
	}

	const handleOnInputKeyDown = (key) => {
		if(key === 'Enter' && Object.keys(newConversation).length) {
			onSubmit(newConversation);
		}
	}

	return (
		<Modal
			title="Nouvelle conversation"
			visible={isVisible}
			onCancel={onCancel}
			footer={
				<div>
					<Button
						disabled={!Object.keys(newConversation).length}
						onClick={() => onSubmit(newConversation)}
					>
						Ajouter
					</Button>
				</div>
			}
		>
			<>
				<Form.Item>
					<Select
						data-testid="selectUser"
						ref={selectUserRef}
						showSearch
						placeholder="Choisissez un utilisateur"
						optionFilterProp="children"
						onChange={handleOnChangeUserConversation}
						filterOption={(input, option) =>
							option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
						}
						onInputKeyDown={({ key }) =>  handleOnInputKeyDown(key)}
					>
						{
							users.filter(({ id }) => loggedUser.id !== id)
								.map(user => <Option key={user.id} value={user.id}>{user.nickname}</Option>)
						}
					</Select>
				</Form.Item>
			</>
		</Modal>
	)
}

EditorModal.propTypes = {
	isVisible: bool.isRequired,
	onCancel: func.isRequired,
	onSubmit: func.isRequired
}

export default EditorModal;