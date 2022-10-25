import express from 'express';

import { auth, logout } from '../controllers/auth';

const router = express.Router();

router.post('/', auth);
router.delete('/', logout);

module.exports = router;
