import { MongoClient, ObjectId } from 'mongodb';

const client = new MongoClient('mongodb://127.0.0.1:27017');
const db = client.db('gotogamejam');
const GamesCollection = db.collection('games');
const VotesCollection = db.collection('votes');
const JudgesCollection = db.collection('judges');


async function getNotVotedGamesById(judgeId) {
    await client.connect();

    const votedGames = await VotesCollection.find({judge: new ObjectId(judgeId)}).toArray();
    const votedGamesIds = votedGames.map(vote => vote.game);

    const notVotedGames = await GamesCollection.find({ _id: { $nin: votedGamesIds } }).toArray();    
    return notVotedGames;
}


async function getGames(edition, genre){
    await client.connect();
    console.log(edition, genre);
    let query = {};
    if (edition) query.edition = parseInt(edition);
    if (genre) query.genre = genre;
    return GamesCollection.find(query).sort({name: 1}).toArray();
}


async function getGameById(id){
    await client.connect()
    return GamesCollection.findOne({_id: new ObjectId(id)})
            .catch((err) => {
                console.log(err);
            })
}


async function getGamesByEdition(year){
    await client.connect();
    return GamesCollection.find({ edition: parseInt(year) }).sort({ totalPoint: 1 }).toArray();
}


async function deleteGameById(id){
    await client.connect();
    try {
        const result = await GamesCollection.deleteOne({_id: new ObjectId(id)});
        return result;
    } catch(err) {
        console.error("Error tratando de borrar el juego:", err);
        throw err;
    }
}


async function createGame(game){
    await client.connect()
    const newgame = {
        _id: new ObjectId(),
        ...game,
        totalPoint: 0
    }
    
    await GamesCollection.insertOne(newgame)
    return newgame
}


async function updateGameById(id, gameData){
    await client.connect()
    const updateData = { ...gameData };
    delete updateData.totalPoint;
    const updateGame = await GamesCollection.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: gameData },
        { returnDocument: 'after' }
    );

    return updateGame.value
}

async function getJudgesByGameId(gameId) {
    await client.connect();

    try {
        const votes = await VotesCollection.find({ game: new ObjectId(gameId) }).sort({ finalScore: 1}).toArray();

        const judgesInfo = await Promise.all(
            votes.map(async vote => {
                const judge = await JudgesCollection.findOne({ _id: vote.judge });
                return {
                    judgeName: judge.name,
                    judgeUsername: judge.username,
                    scores: vote.scores,
                    finalScore: vote.finalScore,
                };
            })
        );

        return judgesInfo;
    } catch (error) {
        console.error('Error en getJudgesByGameId:', error);
        throw error;
    }
}


export {
    getGames,
    getGameById,
    createGame,
    getNotVotedGamesById,
    deleteGameById,
    updateGameById,
    getJudgesByGameId,
    getGamesByEdition
}

export default {
    getGames,
    getGameById,
    createGame,
    getNotVotedGamesById,
    deleteGameById,
    updateGameById,
    getJudgesByGameId,
    getGamesByEdition
}