export const actionTypes = {
	MESSAGES_PENDING: "MESSAGES_PENDING",
	GET_MESSAGES: "GET_MESSAGES",
	POST_MESSAGE: "POST_MESSAGE"
};

export const messagesPending = (
	state = false,
	action
) => {
	switch (action.type) {
		case actionTypes.MESSAGES_PENDING:
			return action.isPending;
		default:
			return state;
	}
};

export const messages = (
	state = [],
	action
) => {
	switch (action.type) {
		case actionTypes.GET_MESSAGES:
			return action.messages
				.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
				.map((message, index) => ({ ...message, id: index }));
		case actionTypes.POST_MESSAGE:
			return [
				...state,
				{
					id: action.data.id,
					conversationId: action.data.conversationId,
					timestamp: action.data.timestamp,
					authorId: action.data.authorId,
					body: action.data.body
				}
			].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
		default:
			return state;
	}
};