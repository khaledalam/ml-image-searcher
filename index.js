const express = require('express');
require('dotenv').config();
const { getImages } = require('./lib');
const { indexHTML } = require('./view');

const app = express();

app.get('/', (req, res) => res.send(indexHTML()));

app.get("/:text", (req, res) => {

    const searchText = req.params['text'];

    getImages(searchText).then(result => res.send(indexHTML(result.htmlAll, searchText)));

});

// getImages('cat').then((ret) => console.log(ret.filteredData))


if (process.env.LISTENER.toLowerCase() == 'true') {
    app.listen(process.env.PORT || 8080);
}