const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const YouTube = require('youtube-node');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// API calls
app.get('/api/hello', (req, res) => {
app.post('/api/world', (req, res) => {
  console.log(req.body);
  var youTube = new YouTube();
    youTube.setKey('AIzaSyC0-6-pLENmfwheUSBIIdlSWJ-q3mlfF8I');
    youTube.search(`${req.body.post}`, 2, function(error, result) {
            if (error) {
                console.log(error);
            } else {
                console.log(JSON.stringify(result, null, 2));
            }
            res.send(JSON.stringify(result, null, 2));
        });
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