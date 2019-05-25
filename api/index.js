import express from 'express';
import { MongoClient, ObjectID } from 'mongodb';
import assert from 'assert';
import config from '../config';

const router = express.Router();

const url = config.mongodbUri;

let mdb;

MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
  assert.equal(null, err);
  const db = client.db('mern');

  mdb = db;
});

// contests routes

router.get('/contests', (req, res) => {
  let contests = {};
  mdb
    .collection('contests')
    .find({})
    .project({
      categoryName: 1,
      contestName: 1,
    })
    .each((err, contest) => {
      assert.equal(null, err);
      if (!contest) {
        res.send({ contests });
        return;
      }
      contests[contest._id] = contest;
    });
});
router.get('/contests/:contestId', (req, res) => {
  mdb
    .collection('contests')
    .findOne({ _id: ObjectID(req.params.contestId) })
    .then(contest => {
      res.send(contest);
    })
    .catch(console.err);
});

// names routes

router.get('/names/:nameIds', (req, res) => {
  const nameIds = req.params.nameIds.split(',').map(ObjectID);
  let names = {};
  mdb
    .collection('names')
    .find({ _id: { $in: nameIds } })
    .each((err, name) => {
      assert.equal(null, err);
      if (!name) {
        res.send({ names });
        return;
      }
      names[name._id] = name;
    });
});

export default router;
