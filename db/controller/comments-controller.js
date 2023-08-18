const {
    selectCommentsByArticleId,
    makePostComment,
    updateVotes
} = require('../model/comments-model');

const getCommentsByArticleId = (request, response, next) => {

    const article_id = parseInt(request.params.article_id);
    selectCommentsByArticleId(article_id)
    .then((comments) => {
        response.status(200).send({comments});
    })
    .catch(next);
}

const postComment = (request, response, next) => {
    const {article_id} = request.params;
    const {username, body} = request.body;
    makePostComment({article_id, username, body})
    .then((comment) => {
        response.status(201).send({comment})
    })
    .catch(next);
}

const patchVotesInComments = (request, response, next) => {
    const {article_id} = request.params;
    const {inc_votes} = request.body;
    updateVotes(inc_votes, article_id)
    .then((comment) => {
        response.status(200).send({comment})
    })
    .catch(next);
}


module.exports = { getCommentsByArticleId, postComment, patchVotesInComments };
