var express = require('express');
var router = express.Router();
var Graph = require('../../utils/graph');
var _ = require('lodash');
// var userGraph  = new Graph(users);

var users = [
    {
        id: 1,
        name: 'Daniel',
        company: 'Renault',
        friends: [2, 3, 4, 5, 7]
    },
    {
        id: 2,
        name: 'Terry',
        company: 'Lufthansa',
        friends: [1, 6, 8]
    },
    {
        id: 3,
        name: 'Paul',
        company: 'Nissan',
        friends: [1, 4, 5, 8]
    },
    {
        id: 4,
        name: 'Wilson',
        company: 'Schindler',
        friends: [1, 3, 6, 8]
    },
    {
        id: 5,
        name: 'Russell',
        company: 'Volkswagen',
        friends: [1, 3, 7]
    },
    {
        id: 6,
        name: 'Any',
        company: 'Fiat',
        friends: [2, 4, 7, 8]
    },
    {
        id: 7,
        name: 'Nicolas',
        company: 'Siemens',
        friends: [1, 5, 6, 8]
    },
    {
        id: 8,
        name: 'Patty',
        company: 'BMW',
        friends: [2, 3, 4, 6, 7]
    }
];


router.use(function (req) {
    req.userGraph = new Graph(users);
    req.next();
});



router.post('/', function (req, res) {
    const userId = req.body.userId;
    const companyName = req.body.companyName;
    const user = _.find(users, ['id', userId]);
    const path = req.userGraph.shortestPath(user, companyName);
    res.send(req.userGraph.shortestPath(user, companyName));
});
module.exports = router;