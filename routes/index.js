// Requires
var router = require('express').Router();
var path = require('path');

// Server-side get on the base url
router.get('/', function (req, res) {
    var indexPath = path.join(__dirname, '../public/views/index.html');
    console.log("In base url");
    res.sendFile(indexPath);
});

// Export router
module.exports = router;