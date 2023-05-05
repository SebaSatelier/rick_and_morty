const {postUser} = require('./postUser');

const {login} = require('./login');

const {postFav} = require("./postFav");

const {deleteFav} = require("./deleteFav");

module.exports = {
    postUser,
    login,
    postFav,
    deleteFav
}