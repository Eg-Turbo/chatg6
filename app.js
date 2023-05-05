const express = require('express')
const path = require('path');
const expressEnforcesSSL = require('express-enforces-ssl');

const app = express()
const port = process.env.PORT || 3000 // Heroku will need the PORT environment variable

app.use(express.static(path.join(__dirname, 'build')));

app.use(expressEnforcesSSL());





app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => console.log(`App is live on port ${port}!`))
