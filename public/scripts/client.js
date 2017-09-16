console.log('In js');

$(document).ready(onReady);

function onReady() {
    console.log('In jQ');
    getTasks();
}

function getTasks() {
    console.log('In getTasks');
    // ajax get
    $.ajax({
        type: 'GET',
        url: '/tasks',
        success: function (serverRes) {
            console.log('serverRes: ', serverRes);
            // Clear out taskTable
            $('#taskTable').empty();
            // For each item being returned
            for (var i = 0; i < serverRes.length; i++) {
                console.log('serverRes[i]', serverRes[i]);
                // Create row
                var $trow = $('<tr></tr>');
                // Append data to table row
                $trow.append('<td>' + serverRes[i].taskname + '</td>');
                
                // Append complete task button to row
                var $completeButton = $('<td><button class="completeMe" data-id="'
                    + serverRes[i].id + '">Complete</button></td>');
                $trow.append($completeButton);
                
                // BUTTON GOES HERE
                var $deleteButton = $('<td><button class="deleteMe" data-id="' 
                    + serverRes[i].id + '">Delete</button></td>');
                $trow.append($deleteButton);

                // Append row to table
                $('#taskTable').append($trow);
            } // end for loop
        }
    })
}