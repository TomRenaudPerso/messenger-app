export const actionTypes = {
	GET_USERS: "GET_USERS",
	GET_LOGGED_USER: "GET_LOGGED_USER"
};

export const users = (
	state = [],
	action
) => {
	switch (action.type) {
		case actionTypes.GET_USERS:
			return action.users;
		default:
			return state;
	}
};

export const loggedUser = (
	state = {
		"id": 1,
		"nickname": "Thibaut",
		"token": "xxxx"
	},
	action
) => {
	switch (action.type) {
		case actionTypes.GET_LOGGED_USER:
			return action.loggedUser;
		default:
			return state;
	}
}