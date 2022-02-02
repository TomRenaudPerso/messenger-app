import * as API from "../services/API";
import { actionTypes } from '../reducers/message';

export const postMessage = data => dispatch => {
	return dispatch({
		type: actionTypes.POST_MESSAGE,
		data
	});
}

export const getMessages = (conversationId) => async dispatch => {
	dispatch({
		type: actionTypes.MESSAGES_PENDING,
		isPending: true
	});
	const messages = await API.getMessages(conversationId);
	dispatch({
		type: actionTypes.MESSAGES_PENDING,
		isPending: false
	});
	return dispatch({
		type: actionTypes.GET_MESSAGES,
		messages
	});
};