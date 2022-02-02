import db from "../../mock/db.json";

export const getConversations = (userId) => {
	if(db && db["conversations"]) {
		return db["conversations"]
			.filter((conversation) =>
				conversation.recipientId === parseInt(userId, 10) || conversation.senderId === parseInt(userId, 10)
			);
	}
	return [];
}