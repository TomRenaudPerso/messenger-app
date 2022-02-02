import { combineReducers } from "redux";
import { conversations, conversationsPending } from "./conversation";
import { users, loggedUser } from "./user";
import { messages, messagesPending } from "./message";

export const app = combineReducers({
  loggedUser,
  messagesPending,
  messages,
  conversationsPending,
  conversations,
  users
});
