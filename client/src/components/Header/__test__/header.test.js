import React from "react";
import renderer from 'react-test-renderer';
import { Header } from "../index";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import {render} from "@testing-library/react";

const initialState = {
	loggedUser: {
		"id": 1,
		"nickname": "Thibaut",
		"token": "xxxx"
	}
};
const mockStore = configureStore();
let store;

test('check user nickname', () => {
	store = mockStore(initialState);
	const { getByTestId } = render(
		<Provider store={store}>
			<Header />
		</Provider>
	);
	const nickname = getByTestId("userNickname");
	expect(nickname.textContent).toBe("Thibaut");
});

test("should match snapshot", () => {
	store = mockStore(initialState);
	const tree = renderer.create(
		<Provider store={store}>
			<Header />
		</Provider>
	).toJSON();
	expect(tree).toMatchSnapshot();
});