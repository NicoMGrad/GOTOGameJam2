import express from 'express';
import VotesControllers from '../controllers/votes.js';
import { voteExistsMiddleware } from '../controllers/middlewares.js';

const router = express.Router();

router.post('/votes', voteExistsMiddleware, VotesControllers.registerVote);
router.get('/votes', VotesControllers.getAllVotes);
router.get('/votes/:judgeId', VotesControllers.getVotesByJudge);
router.get('/votes/:id', VotesControllers.getVoteById);

export default router;