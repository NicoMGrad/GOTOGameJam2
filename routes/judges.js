import express from 'express';
import JudgesControllers from '../controllers/judges.js';
import { judgeExistsMiddleware } from '../controllers/middlewares.js';

const router = express.Router();

router.post('/judge/', [ judgeExistsMiddleware ], JudgesControllers.registerJudge);
router.post('/judge/login', JudgesControllers.loginJudge);
router.get('/judge/:id', JudgesControllers.getJudgeDetails);

export default router;
