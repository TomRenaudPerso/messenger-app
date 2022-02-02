import express from 'express';
import { getUsers, getUser } from '../../services/users';

const router = express.Router();

router.get('/', async (req, res, next) => {
	try {
		const users = getUsers();
		res.send(users);
	} catch (e) {
		console.error("Error while fetching users : ", e.message);
	}
});

router.get('/:userId', async (req, res, next) => {
	try {
		const user = getUser(req.params.userId);
		res.send(user);
	} catch (e) {
		console.error("Error while fetching user : ", e.message);
	}
});

export default router;