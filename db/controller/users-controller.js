const {selectUsers} = require('../model/users-model')

function getUsers(request, response, next) {
    selectUsers()
    .then((users) => {
        response.status(200).send({users})
    })
    .catch(next);
}

module.exports = {getUsers}