const path = require('path');
const express = require('express');
const rootDir = require('../util/path');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render(path.join(rootDir, 'views', 'about.ejs'));
});

module.exports = router;