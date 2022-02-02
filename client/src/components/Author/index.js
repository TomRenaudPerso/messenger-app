import React from "react";
import Tooltip from "antd/lib/tooltip";
import RightCircleOutlined from '@ant-design/icons/RightCircleOutlined';
import { string, number } from "prop-types";
import { useHistory } from "react-router-dom";
import "./styles.scss";

const Author = ({ conversationId, name }) => {
	let history = useHistory();
	return (
		<p style={{ fontSize: 16, fontWeight: 500 }} data-testid="paragraphAuthor">
			<Tooltip placement="left" title="voir les messages">
				<RightCircleOutlined
					className="message-visibility"
					onClick={() => history.push(`/conversations/${conversationId}/messages`)}
				/>
			</Tooltip>
			{name}
		</p>
	);
};

Author.propTypes = {
	conversationId: number.isRequired,
	name: string.isRequired,
}

export default Author;