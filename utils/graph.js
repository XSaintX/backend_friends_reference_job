var _ = require('lodash');
class Graph {
    constructor(users) {
        this.edges = {};
        this.users = users;
        _.forEach(users, (user) => {
            this.edges[user.id] = user.friends;
        });
    }
    shortestPath(sourceUser, targetCompany) {
        var shortestPath;
        var tail = 0;
        var queue = [sourceUser];
        var visitedNodes = [];
        var prevPath = {};
        if (_.isEqual(sourceUser.company, targetCompany)) {
            return;
        }
        visitedNodes.push(sourceUser.id);
        while (!shortestPath && tail < queue.length) {
            var user = queue[tail];
            var friendsIds = this.edges[user.id];
            _.forEach(friendsIds, (friendId) => {
                if (shortestPath) return;
                var friend = _.find(this.users, ['id', friendId]);
                if (_.includes(visitedNodes, friendId)) {
                    return;
                }
                visitedNodes.push(friendId);
                if (_.isEqual(friend.company, targetCompany)) {
                    var path = [friend];
                    while (user.id !== sourceUser.id) {
                        path.unshift(user);
                        user = prevPath[user.id];
                    }
                    path.unshift(user);
                    shortestPath = _.map(path, 'name').join('-');
                }
                if (shortestPath) return;
                prevPath[friend.id] = user;
                queue.push(friend);
            });
            tail++;
        }
        return shortestPath ||
            `No path between ${sourceUser.name} & ${targetCompany}`;
    }
}
module.exports = Graph;