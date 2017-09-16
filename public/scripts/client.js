console.log('In js');

$(document).ready(onReady);

function onReady() {
    console.log('In jQ');
    getTasks();
    // Event listeners
    $('#addButton').on('click', addTask);
    $('#tasksToComplete').on('click', '.deleteMe', deleteTask);
    $('#tasksToComplete').on('click', '.completeMe', completeTask);

}

// Function to add task to database
function addTask() {
    // Variable to hold item from input on page
    var taskToAdd = $('#inputBox').val();
    $('#inputBox').val('');
    console.log('Task entered: ', taskToAdd);
    // Wrap variable in an object to send to server
    var objectToSend = {
        task: taskToAdd
    };

    // Ajax post
    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: objectToSend,
        success: function (serverRes) {
            console.log('Post serverRes', serverRes);
            // Refresh list of tasks on DOM
            getTasks();
        }
    });
} // end addTask

// Function to toggle completion of task
function completeTask() {
    // Get id of the parent div of the complete button clicked
    var thisId = $(this).parent().data('id');
    var thisCompletion = $(this).parent().data('complete');
    // Create object containing data to modify
    var objectToMod = {
        id: thisId,
        completed: thisCompletion
    }
    console.log('objectToMod -->', objectToMod);
    // Ajax put
    $.ajax({
        type: 'PUT',
        url: '/tasks',
        data: objectToMod,
        success: function(res) {
            console.log('Put res', res);
            getTasks();
        }
    })
} // end completeTask

// Function to remove task
function deleteTask() {
    // Get the id of the parent div of the delete button clicked
    var thisId = $(this).parent().data('id');
    console.log($(this).parent());
    console.log($(this));
    console.log(thisId);

    // Ajax delete
    $.ajax({
        type: 'DELETE',
        // Passing the server the id in the url
        url: '/tasks/' + thisId,
        success: function(res) {
            console.log('Delete res', res);
            getTasks();
        }
    })
} // end completeTask

// Function to retrieve tasks from database
function getTasks() {
    console.log('In getTasks');
    $('#tasksToComplete').empty();
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
                // Create div
                var $taskDiv = $('<div data-id="' + serverRes[i].id + '"'
                    + ' data-complete="' + serverRes[i].complete + '">');
                // Add a name of task to div
                var $textDiv = $('<div>' + serverRes[i].taskname +'</div>')
                $taskDiv.append($textDiv);
                // Display completed/not completed
                if (serverRes[i].complete === true) {
                    var taskStatus = 'Completed';
                }
                else {
                    var taskStatus = 'Not completed';
                }
                var $completeDiv = $('<div>' + taskStatus + '</div>')
                $taskDiv.append($completeDiv);
                // Add completed button to div
                var $completeButton = $('<input>', {type: 'button', class: 'completeMe', value: 'Complete'});
                $taskDiv.append($completeButton);
                // Add delete button to div
                var $deleteButton = $('<input>', {type: 'button', class: 'deleteMe', value: 'Delete'});
                $taskDiv.append($deleteButton);
                // Append div to section on page
                $('#tasksToComplete').append($taskDiv);

                // // Create row
                // var $trow = $('<tr data-id="' + serverRes[i].id + '"></tr>');
                // // Append data to table row
                // $trow.append('<td>' + serverRes[i].taskname + '</td>');
                // // if/else to display completed/not completed
                // if (serverRes[i] === true) {
                //     var taskStatus = 'Completed';
                // }
                // else {
                //     var taskStatus = 'Not completed';
                // }
                // $trow.append('<td>' + taskStatus + '</td>');
                
                // // Append complete task button to row
                // var $completeButton = $('<td><button class="completeMe" data-id="'
                //     + serverRes[i].id + '">Complete</button></td>');
                // $trow.append($completeButton);
                
                // // BUTTON GOES HERE
                // /*
                // var $deleteButton = $('<td><button class="deleteMe" data-id="' 
                //     + serverRes[i].id + '">Delete</button></td>');
                // */
                // var $deleteButton = $('<td><button class="deleteMe">Delete</button></td>');
                // $trow.append($deleteButton);

                // // Append row to table
                // $('#taskTable').append($trow);
            } // end for loop
        }
    })
} // end getTasks