const express = require('express')
const path = require('path');

const app = express()
const port = process.env.PORT || 3000 // Heroku will need the PORT environment variable


app.use(express.static(path.join(__dirname, 'build')));

app.use(
  function (req, res, next) {
    if (!req.secure) {
      return res.redirect(`https://${req.headers.host}${req.url}`)
    }
  }
)

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => console.log(`App is live on port ${port}!`))
