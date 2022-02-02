import React from "react";
import { render } from "@testing-library/react";
import Message from "../index";
import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

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
	}
};
const mockStore = configureStore();
let store;

test('check content and author', () => {
	store = mockStore(initialState);
	const { getByTestId } = render(
		<Provider store={store}>
			<Message
				authorId={2}
				author="John Doe"
				body="Hello World"
			/>
		</Provider>
	);
	const body = getByTestId("bodyMessage");
	const author = getByTestId("authorMessage");
	expect(body.textContent).toBe("Hello World");
	expect(author.textContent).toBe("John Doe");
});

test("should match snapshot", () => {
	store = mockStore(initialState);
	const tree = renderer.create(
		<Provider store={store}>
			<Message
				authorId={2}
				author="John Doe"
				body="Hello World"
			/>
		</Provider>
	).toJSON();
	expect(tree).toMatchSnapshot();
});