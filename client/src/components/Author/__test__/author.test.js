import React from "react";
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Author from "../index";

test('renders with name and private message', () => {
	const { getByTestId } = render(<Author conversationId={1} name="John Doe" />);
	const paragraphAuthor = getByTestId("paragraphAuthor");
	expect(paragraphAuthor.textContent).toContain("John Doe");
});

test("should match snapshot", () => {
	const tree = renderer.create(<Author  conversationId={1} name="John Doe" />).toJSON();
	expect(tree).toMatchSnapshot();
});