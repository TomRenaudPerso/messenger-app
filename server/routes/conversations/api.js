import express from 'express';
import {getConversations} from "../../services/conversations";

const router = express.Router();

router.get('/:userId', async (req, res, next) => {
	try {
		const userId = req.params.userId;
		const conversations = getConversations(userId);
		res.send(conversations);
	} catch (e) {
		console.error("Error while fetching conversations : ", e.message);
	}
});

export default router;