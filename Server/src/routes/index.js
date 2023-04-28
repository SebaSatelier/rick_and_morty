const {getCharById} = require('../controllers/getCharById');
const {getLogin} = require('../controllers/login');
const {postFav, deleteFav, getFav} = require('../controllers/handleFavorites');
const express = require('express');

const router = express.Router();

router.get('/character/:id',getCharById)

router.get('/login', getLogin)

router.post('/fav', postFav)

router.get('/fav', getFav)

router.delete('/fav/:id', deleteFav)


module.exports = {
    router
}