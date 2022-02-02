import * as API from "../services/API";
import {actionTypes} from "../reducers/conversation";

export const getConversations = (userId) => async dispatch => {
	dispatch({
		type: actionTypes.CONVERSATIONS_PENDING,
		isPending: true
	});
	const conversations = await API.getConversations(userId);
	dispatch({
		type: actionTypes.CONVERSATIONS_PENDING,
		isPending: false
	});
	return dispatch({
		type: actionTypes.GET_CONVERSATIONS,
		conversations
	});
};

export const postConversation = (newConversation) => async dispatch => {
	return dispatch({
		type: actionTypes.POST_CONVERSATION,
		newConversation
	});
}