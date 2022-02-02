import express from 'express';
import { getMessages } from '../../services/messages';

const router = express.Router();

router.get('/:conversationId', async (req, res, next) => {
	try {
		const messages = await getMessages(req.params.conversationId);
		res.send(messages);
	} catch (e) {
		console.error("Error while fetching messages : ", e.message);
	}
});

export default router;