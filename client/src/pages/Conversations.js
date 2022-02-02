import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getConversations, postConversation } from "../actions/conversations";
import Card from "antd/lib/card";
import Button from "antd/lib/button";
import LoadingOutlined from "@ant-design/icons/LoadingOutlined";
import EditorModal from "../components/EditorModal";
import "../styles/home.scss";
import Conversation from "../components/Conversation";
import {useHistory} from "react-router-dom";

const Conversations = () => {

    const [editorModalVisible, setEditorModalVisible] = useState(false);

    // SELECTORS
    const loggedUser = useSelector(state => state.loggedUser);
    const conversations = useSelector(state => state.conversations);
    const conversationsPending = useSelector(state => state.conversationsPending);

    const dispatch = useDispatch();
    let history = useHistory();

    useEffect( () => {
      dispatch(getConversations(loggedUser.id));
    }, []);

    const handleOnSubmit = (newConversation) => {
      setEditorModalVisible(!editorModalVisible);
      dispatch(postConversation(newConversation));
      history.push(`/conversations/${newConversation.id}/messages`);
    };

    const conversationsMemo = useMemo(() =>
        conversations.map(({ id, ...other }) =>
          <Conversation
            key={id}
            userId={loggedUser.id}
            id={id}
            {...other}
          />
        ),
      [conversations]
    );

    return (
        <div>
          <Card
	          loading={conversationsPending}
            title={
              <span>
                Conversations { conversationsPending && <LoadingOutlined className="messages-loading-icon" /> }
              </span>
            }
            className="card-messages"
          >
            { conversationsMemo }
          </Card>
          <div className="container-button-editor-modal">
            <Button
              type="primary"
              onClick={() => setEditorModalVisible(!editorModalVisible)}
            >
              Nouvelle conversation
            </Button>
          </div>
          {
            editorModalVisible &&
            <EditorModal
              isVisible={editorModalVisible}
              onCancel={() => setEditorModalVisible(!editorModalVisible)}
              onSubmit={handleOnSubmit}
            />
          }
        </div>
    );
};

export default Conversations;