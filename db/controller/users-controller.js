const {selectUsers} = require('../model/users-model')

export function getUsers(request, response, next) {
    selectUsers()
    .then((users) => {
        response.status(200).send({users})
    })
    .catch(next);
}