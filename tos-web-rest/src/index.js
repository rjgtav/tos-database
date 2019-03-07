const axios = require('axios');
const bodyParser = require('body-parser');
const express = require('express');

const port = 3939;
const app = express();
      app.use(bodyParser.json()); // support json encoded bodies
      app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.post('/api/tinyurl/create', async (request, response) => {
    let tinyurl = await axios.get('http://tinyurl.com/api-create.php?url=' + encodeURIComponent(request.body.url));
        tinyurl = tinyurl.data;

    response.send(tinyurl);
});
app.get('/api/tinyurl/get', async (request, response) => {
    let tinyurl = await axios.get('http://tinyurl.com/' + request.query.id, { maxRedirects: 0, validateStatus: (status) => status === 301 });
        tinyurl = tinyurl.headers.location;

    response.send(tinyurl);
});

// Launch server on the specified port
app.listen(port, () => console.log(`Listening on port ${port}`));
