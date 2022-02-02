import React from "react";
import Adapter from 'enzyme-adapter-react-16';
import EditorModal from "../index";
import EnzymeToJson from 'enzyme-to-json';
import { configure, mount } from 'enzyme';
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import thunk from "redux-thunk";

beforeEach(() => {
	Object.defineProperty(window, 'matchMedia', {
		writable: true,
		value: jest.fn().mockImplementation(query => ({
			matches: false,
			media: query,
			onchange: null,
			addListener: jest.fn(), // deprecated
			removeListener: jest.fn(), // deprecated
			addEventListener: jest.fn(),
			removeEventListener: jest.fn(),
			dispatchEvent: jest.fn(),
		})),
	});
});

const initialState = {
	loggedUser: {
		"id": 1,
		"nickname": "Thibaut",
		"token": "xxxx"
	},
	users: [
		{
			"id": 2,
			"nickname": "Jeremie",
			"token": "xxxx"
		},
		{
			"id": 3,
			"nickname": "Patrick",
			"token": "xxxx"
		},
		{
			"id": 4,
			"nickname": "Elodie",
			"token": "xxxx"
		}
	],
	conversations: []
};

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
let store;

configure({ adapter: new Adapter() });
test("should match snapshot", () => {
	store = mockStore(initialState);
	const subject = mount(
		<Provider store={store}>
			<EditorModal
				isVisible
				onCancel={() => ({})}
				onSubmit={() => ({})}
			/>
		</Provider>
	);
	expect(EnzymeToJson(subject)).toMatchSnapshot();
});