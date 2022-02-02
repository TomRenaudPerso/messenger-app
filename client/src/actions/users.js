import {actionTypes} from "../reducers/user";
import * as API from "../services/API";

export const getUsers = () => async dispatch => {
	const users = await API.getUsers();
	return dispatch({
		type: actionTypes.GET_USERS,
		users
	});
}