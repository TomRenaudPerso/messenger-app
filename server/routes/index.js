import express from 'express';
import path from 'path';
import apiMessagesRouter from './messages/api';
import apiConversationsRouter from './conversations/api';
import apiUsersRouter from './users/api';

const router = express.Router();
const BASE_PATH = process.env.BASE_PATH || 'http://localhost:3000';

// IMAGES
router.use('/images/**', (req, res) => {
    const fileName = req.params[Object.keys(req.params)[0]];
    res.sendFile(path.join(__dirname, '../../public/images', fileName));
});

// CSS
router.use('/entry.css', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/bundle', 'entry.css'));
});

// JS
router.use('/entry.js', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/bundle', 'entry.js'));
});

// API'S
router.use('/api/messages', apiMessagesRouter);
router.use('/api/conversations', apiConversationsRouter);
router.use('/api/users', apiUsersRouter);

// HOME TEMPLATE
router.get('/*', (req, res) => {
    res.render('home', {
        css: `${BASE_PATH}/entry.css`,
        js: `${BASE_PATH}/entry.js`
    });
});

export default router;