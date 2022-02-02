export const actionTypes = {
	CONVERSATIONS_PENDING: "CONVERSATIONS_PENDING",
	GET_CONVERSATIONS: "GET_CONVERSATIONS",
	POST_CONVERSATION: "POST_CONVERSATION"
};

export const conversationsPending = (
	state = false,
	action
) => {
	switch (action.type) {
		case actionTypes.CONVERSATIONS_PENDING:
			return action.isPending;
		default:
			return state;
	}
};

export const conversations = (
	state = [],
	action
) => {
	switch (action.type) {
		case actionTypes.GET_CONVERSATIONS:
			return action.conversations.sort((a, b) =>
				new Date(b.lastMessageTimestamp * 1000) - new Date(a.lastMessageTimestamp * 1000)
			);
		case actionTypes.POST_CONVERSATION:
			return [
				...state,
				action.newConversation
			].sort((a, b) =>
				new Date(b.lastMessageTimestamp * 1000) - new Date(a.lastMessageTimestamp * 1000)
			);
		default:
			return state;
	}
};