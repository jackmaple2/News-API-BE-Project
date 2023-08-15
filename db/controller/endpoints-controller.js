const fs = require('fs');
const db = require('../connection');
const { convertTimestampToDate, createRef, formatComments} = require('../seeds/utils');
const jsonEndpoints = require('../../endpoints.json');


const getEndpointInformation = (request, response) => {
    response.status(200).send(jsonEndpoints);

}

module.exports = { getEndpointInformation };