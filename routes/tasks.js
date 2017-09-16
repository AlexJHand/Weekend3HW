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

router.post('/', function (req, res) {
    var myTodo = req.body.task;
    console.log('In post task route');
    // Use pool to connect to database
    pool.connect(function (connectionError, client, done) {
        // If there's an error connecting to database
        if (connectionError) {
            console.log('Connection error: ', connectionError);
            res.sendStatus(500);
        }
        else {
            // Create sql parameterized query string
            var queryString = 'INSERT INTO todo (taskname) VALUES ($1)';
            // Values to insert into our sql string
            var values = [myTodo];
            // Add them together and send to database
            client.query(queryString, values, function(queryError, resultObj) {
                // Release the client
                done();
                // If there's an error with our queryString
                if (queryError) {
                    console.log('Query error: ', queryError);
                    res.sendStatus(500);
                }
                else {
                    console.log('Successful post', 201);
                    res.sendStatus(201);
                }
            }) 
        }
    })
})

module.exports = router;