import db from "../../mock/db.json";

export const getMessages = (conversationId) => {
	if(db && db["messages"]) {
		return db["messages"]
			.filter((messages) => messages.conversationId === parseInt(conversationId, 10));
	}
	return [];
}