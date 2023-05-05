const {getCharById} = require('../controllers/getCharById');
const {postUser, login, postFav, deleteFav} = require('../controllers')
const express = require('express');

const router = express.Router();

router.get('/character/:id',getCharById)

router.get('/login', login);

router.post('/login', postUser);

router.post('/fav', postFav);

// router.get('/fav', getFav)

router.delete('/fav/:id', deleteFav)


module.exports = {
    router
}