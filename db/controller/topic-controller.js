const {
    selectTopics
} = require('../model/topics-model');


const getTopics = (request, response, next) => {
    const {  } = request.query

    selectTopics()
    .then((topics) => {
        response.status(200).send({topics});
    })
    
 };


module.exports = { getTopics };