import { MongoClient, ObjectId } from 'mongodb';
import { updateGameById, getGameById } from './games.js';
import { getJudgeById } from './judges.js';

const client = new MongoClient('mongodb://127.0.0.1:27017');
const db = client.db('gotogamejam');
const VotesCollection = db.collection('votes');

async function saveVote(vote) {
    await client.connect();
    let gameData = await getGameById(vote.game);
    let judgeData = await getJudgeById(vote.judge);

    const newVote = {
        _id: new ObjectId(),
        game: {
            id: vote.game,
            name: gameData.name
        },
        judge: {
            id: vote.judge,
            name: judgeData.name
        },
        points: {
            gameplay: vote.gameplay,
            art: vote.art,
            sound: vote.sound,
            theme: vote.theme
        }
    }

    const points = newVote.points;
    let newValue = 0;

    for (let clave in points) {
        if (points.hasOwnProperty(clave) && typeof points[clave] === 'number') {
            newValue += points[clave];
        }
    }

    await updateGameById(vote.game,{ totalPoint: newValue});
    await VotesCollection.insertOne(newVote);
    return vote;
}

async function voteExists(judgeId, gameId) {
    await client.connect();
    const vote = await VotesCollection.findOne({ 
        "judge.id": judgeId, 
        "game.id": gameId 
    });
    return Boolean(vote);
}

async function getAllVotes() {
    await client.connect();
    return VotesCollection.find().toArray();
}

async function getVotesByJudgeId(judgeId) {
    await client.connect();
    return VotesCollection.find({ judge: new ObjectId(judgeId) }).toArray();
}

async function getVoteById(id) {
    await client.connect();
    return VotesCollection.findOne({ _id: new ObjectId(id) });
}

export default {
    saveVote,
    voteExists,
    getAllVotes,
    getVotesByJudgeId,
    getVoteById
};
