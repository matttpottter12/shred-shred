const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const _ = require('lodash');
const YouTube = require('youtube-node');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// API calls
app.post('/api/YTsearch', (req, res) => {
var youTube = new YouTube();
youTube.setKey('AIzaSyC0-6-pLENmfwheUSBIIdlSWJ-q3mlfF8I');
youTube.search(`${req.body.post}`, 10, function(error, result) {
        if (error) {
            console.log(error);
        } 
        let urls = [];
        _.forEach(result.items, (item) => {
            let videObject = {
                id: item.id.videoId,
                url: `https://www.youtube.com//embed/${item.id.videoId}`,
                title: item.snippet.title,
                thumbnail: _.get(item, 'snippet.thumbnails.high.url')
            }
            urls.push(videObject);
        });
        res.send(urls);
    });
});
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}
app.listen(port, () => console.log(`Listening on port ${port}`));