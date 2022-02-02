import db from "../../mock/db.json";

export const getUsers = () => {
	if(db && db["users"]) {
		return db["users"];
	}
	return [];
};

export const getUser = (userId) => {
	if(db && db["users"]) {
		return db["users"].filter((users) => users.id === parseInt(userId, 10))[0];
	}
	return [];
};