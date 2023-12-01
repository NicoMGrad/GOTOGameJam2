import express from 'express'
import GamesControllers from '../controllers/games.js'
import { validateCreateGame, validateUpdateGame } from '../middlewares/games.js';

const route = express.Router();

route.get('/games', GamesControllers.getGames);
route.get('/games/:gameId', GamesControllers.getGameById);
route.put('/games/:gameId', [ validateUpdateGame ], GamesControllers.updateGameById);
route.get('/games/edition/:year', GamesControllers.getGamesByEdition);
route.post('/games',[ validateCreateGame ], GamesControllers.createGame);
route.get('/games/:gameId/judges', GamesControllers.getJudgesByGameId);



export default route