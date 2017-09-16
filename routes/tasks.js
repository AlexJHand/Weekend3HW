// Requires
var router = require('express').Router();
var pool = require('../modules/pool');

// Server-side Get function
router.get('/', function (req, res) {
    console.log('In tasks route');
    // Use pool to connect to database
    pool.connect(function(connectionError, client, done) {
        if (connectionError) {
            console.log(connectionError);
            res.sendStatus(500);
        }
        else {
            // In database connection INSERT sql
            // resultObj is a variable holding response object from db
            client.query('SELECT * FROM todo', function (queryError, resultObj) {
                // Release client
                done();
                if (queryError) {
                    console.log(queryError);
                    res.sendStatus(500);
                }
                else {
                    // resultObj.rows contains the result set as an array of objects
                    console.log('resultObj.rows --> ', resultObj.rows);
                    res.send(resultObj.rows);
                }
            })
        }
    })
})

module.exports = router;