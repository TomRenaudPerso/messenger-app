import { API_CONF } from "../config/api";
import util from "util";

export const getMessages = async (conversationId) => {
    const res = await fetch(util.format(API_CONF.messages, conversationId), {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });
    return res.json();
};

export const getConversations = async (userId) => {
    const res = await fetch(util.format(API_CONF.conversations, userId), {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });
    return res.json();
};

export const getUser = async (userId) => {
    const res = await fetch(util.format(API_CONF.user, userId), {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });
    return res.json();
};

export const getUsers = async () => {
    const res = await fetch(API_CONF.users, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });
    return res.json();
};