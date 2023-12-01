import { gameCreateSchema, gameUpdateSchema } from "../schemas/games.js";

export function validateCreateGame(req, res, next){
    gameCreateSchema.validate(req.body, {
        stripUnknown: true,
        abortEarly: true
    })
      .then(function(game){
        req.body = game;
        next();
      })
      .catch(function(err){
        res.status(400).json(err.errors)
      })
}

export function validateUpdateGame(req, res, next){
  gameUpdateSchema.validate(req.body, {
      stripUnknown: true,
      abortEarly: true
  })
    .then(function(game){
      req.body = game;
      next();
    })
    .catch(function(err){
      res.status(400).json(err.errors)
    })
}